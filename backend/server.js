const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files from Frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// --- API Endpoints ---

// GET /api/tasks/active - Get all active tasks
app.get('/api/tasks/active', (req, res) => {
    const sql = "SELECT * FROM tasks WHERE status = 'active' ORDER BY createdAt DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
});

// GET /api/tasks/history - Get all completed tasks
app.get('/api/tasks/history', (req, res) => {
    const sql = "SELECT * FROM tasks WHERE status = 'completed' ORDER BY completedAt DESC, createdAt DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tasks: rows });
    });
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
    }
    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    db.run(sql, [title, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            title,
            description,
            status: 'active',
            createdAt: new Date(), // Approximate for immediate response
            completedAt: null
        });
    });
});

// PATCH /api/tasks/:id/complete - Mark task as completed
app.patch('/api/tasks/:id/complete', (req, res) => {
    const { id } = req.params;
    const completedAt = new Date().toISOString();
    const sql = "UPDATE tasks SET status = 'completed', completedAt = ? WHERE id = ?";
    db.run(sql, [completedAt, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({ message: "Task marked as completed", id, completedAt });
    });
});

// PUT /api/tasks/:id - Update task details
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
    db.run(sql, [title, description, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({ message: "Task updated", id, title, description });
    });
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json({ message: "Task deleted", id });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
