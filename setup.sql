-- AutoElite — MySQL Setup Script

CREATE DATABASE IF NOT EXISTS autoelite
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE autoelite;


CREATE TABLE IF NOT EXISTS bookings (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  phone      VARCHAR(30)   NOT NULL,
  subject    VARCHAR(200)  NOT NULL,
  message    TEXT          NOT NULL,
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
);

