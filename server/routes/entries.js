import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create entry
router.post('/entry', (req, res) => {
    const {date, data, score} = req.body;

    const stmt = db.prepare(`
        INSERT INTO entries (date, data, score)
        VALUES (?, ?, ?)   
    `);

    const result = stmt.run(
        date,
        JSON.stringify(data),
        score
    );

    res.json({
        id: result.lastInsertRowid
    });
});


router.get('/entries', (req, res) => {
    const rows = db.prepare(`
        SELECT * FROM entries ORDER BY date DESC
    `).all();

    const entries = rows.map(row => ({
        ...row,
        data: JSON.parse(row.data)
    }));

    res.json(entries);
});

export default router;