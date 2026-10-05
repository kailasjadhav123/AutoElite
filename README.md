# AutoElite — Premium Car Rental Website

A full-stack, 5-page luxury car rental website built with HTML, CSS, Bootstrap 5, JavaScript, and a Node.js/Express backend connected to **MySQL**.

---

## Pages

| Page | Description |
|------|-------------|
| Home | Hero, stats, fleet preview, testimonials, CTA |
| Fleet | Filterable vehicle grid (Sports / Sedan / SUV / Convertible / Electric) |
| About | Mission, values, company timeline, team |
| **Booking** | **MySQL-connected form** — captures name, email, phone, vehicle, message |
| Contact | Contact methods, quick message form, FAQ accordion |

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5.3
- **Backend:** Node.js + Express
- **Database:** MySQL (via mysql2 driver)
- **Fonts:** Bebas Neue + Inter via Google Fonts

---

## Setup

### 1. Create the MySQL database

Run the setup script in your MySQL client:

```sql
source database/setup.sql
```

Or manually:

```sql
CREATE DATABASE autoelite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configure your credentials

Open `server.js` and update the `dbConfig` block:

```js
const dbConfig = {
  host:     'localhost',
  port:     3306,
  user:     'root',          // your MySQL username
  password: 'yourpassword',  // your MySQL password
  database: 'autoelite',
};
```

Or use environment variables:

```bash
DB_HOST=localhost DB_USER=root DB_PASSWORD=secret DB_NAME=autoelite node server.js
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open in browser

```
http://localhost:3000
```

---

## Database Schema

```sql
CREATE TABLE bookings (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  phone      VARCHAR(30)   NOT NULL,
  subject    VARCHAR(200)  NOT NULL,
  message    TEXT          NOT NULL,
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
);
```

The table is created automatically on first run if it doesn't exist.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/booking` | Submit a booking (saves to MySQL) |
| GET | `/api/bookings` | List all bookings (admin) |

---

## Project Structure

```
autoelite/
├── server.js              ← Express + MySQL2
├── package.json
├── README.md
├── database/
│   └── setup.sql          ← MySQL setup script
└── public/
    ├── index.html
    ├── fleet.html
    ├── about.html
    ├── booking.html        ← DB-connected form
    ├── contact.html
    ├── css/style.css
    └── js/main.js
```
