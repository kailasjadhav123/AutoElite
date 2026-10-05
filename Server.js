const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection config 
const dbConfig = {
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'Admin@1234',
  database: process.env.DB_NAME     || 'autoelite',
};

let pool;

async function initDB() {
  pool = mysql.createPool(dbConfig);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(100)  NOT NULL,
      email      VARCHAR(150)  NOT NULL,
      phone      VARCHAR(30)   NOT NULL,
      subject    VARCHAR(200)  NOT NULL,
      message    TEXT          NOT NULL,
      created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('MySQL connected — bookings table ready.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const pages = ['index', 'fleet', 'about', 'booking', 'contact'];
pages.forEach(page => {
  app.get(page === 'index' ? '/' : `/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
  });
});


app.post('/api/booking', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO bookings (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message]
    );

    res.json({ success: true, message: 'Booking received!', bookingId: result.insertId });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ success: false, error: 'Database error. Please try again.' });
  }
});


app.get('/api/bookings', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`AutoElite running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MySQL:', err.message);
    console.error('Check your DB credentials in server.js or environment variables.');
    process.exit(1);
  });
