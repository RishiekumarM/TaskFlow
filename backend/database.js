const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/Open database file in the same directory
const dbPath = path.resolve(__dirname, 'taskflow.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize Schema
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        completedAt DATETIME
    )`, (err) => {
        if (err) {
            console.error("Error creating table: " + err.message);
        } else {
            console.log("Tasks table ready.");
        }
    });
});

module.exports = db;
