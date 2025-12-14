const API_BASE = '/api';

const API = {
    // Fetch active tasks
    getActiveTasks: async () => {
        const res = await fetch(`${API_BASE}/tasks/active`);
        return await res.json();
    },

    // Fetch history (completed tasks)
    getHistoryTasks: async () => {
        const res = await fetch(`${API_BASE}/tasks/history`);
        return await res.json();
    },

    // Create a new task
    createTask: async (title, description) => {
        const res = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        return await res.json();
    },

    // Mark task as complete
    completeTask: async (id) => {
        const res = await fetch(`${API_BASE}/tasks/${id}/complete`, {
            method: 'PATCH'
        });
        return await res.json();
    },

    // Update task
    updateTask: async (id, title, description) => {
        const res = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        return await res.json();
    },

    // Delete task
    deleteTask: async (id) => {
        const res = await fetch(`${API_BASE}/tasks/${id}`, {
            method: 'DELETE'
        });
        return await res.json();
    }
};
