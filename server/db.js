import Database from "better-sqlite3";

const db = new Database('fitness.db');

// Create table
db.prepare(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT UNIQUE,
        data TEXT,
        score INTEGER
    )    
`).run();

export default db;