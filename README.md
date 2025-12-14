# manual_implementation_guide.md

This guide details the step-by-step manual process used to build TaskFlow, so you can recreate it or understand the logic.

---

## Prerequisites

- Node.js installed.
- A code editor (VS Code).
- Terminal access.

---

## Step 1: Project Structure Setup

We started by creating a clean folder structure to separate concerns (Frontend vs Backend).

**Create Root Folder:**
```
TaskFlow
```

**Create Subfolders:**

- `TaskFlow/backend`: For server and database.
- `TaskFlow/frontend`: For UI files.
- `TaskFlow/frontend/css` & `TaskFlow/frontend/js`: Organized assets.

---

## Step 2: Backend Initialization

We initialized the Node.js environment to handle API requests and the database.

**Initialize Package:**

Ran `npm init -y` in `backend/` to create `package.json`.

**Install Dependencies:**

- `express`: The web server framework.
- `cors`: To allow the frontend to talk to the backend (middleware).
- `sqlite3`: The database driver for persistent storage.

**Command:**
```bash
npm install express cors sqlite3
```

---

## Step 3: Database Implementation (database.js)

We needed a way to store tasks that survives a server restart, without installing complex external database servers.

**SQLite Connection:**

Setup a connection to a file named `taskflow.db`.

**Schema Creation:**

Wrote SQL to create the `tasks` table if it doesn't exist.

**Fields:**

- `id`
- `title`
- `description`
- `status` (active/completed)
- `createdAt`
- `completedAt`

---

## Step 4: Server Logic (server.js)

We built the API endpoints to handle data.

**Setup Express:**

Configured app and middleware (`cors`, `express.json`).

**Serve Frontend:**

Configured the server to host the static files from `../frontend` so the interface loads on accessing the root URL.

**API Endpoints:**

- `GET /api/tasks/active`: Queries DB for tasks where `status = 'active'`.
- `GET /api/tasks/history`: Queries DB for `status = 'completed'` sorted by date.
- `POST /api/tasks`: Inserts new task into DB.
- `PATCH .../complete`: Updates status to `'completed'` and sets timestamp.
- `DELETE .../:id`: Removes task from DB.
- `PUT .../:id`: Updates title/description.

---

## Step 5: Frontend Interface (index.html)

We created the visual skeleton.

**HTML5 Structure:**

Semantic tags (`header`, `main`, `section`).

**Sections:**

- **Input Form**: Title and Description fields.
- **Active Tasks**: A container div for the list.
- **History**: A separate container for completed items.
- **Edit Modal**: A hidden dialog for updating tasks.

---

## Step 6: Styling (style.css)

We applied a "Premium Dark Theme".

**Variables:**

Defined colors (`--bg-color`, `--primary-color`) for consistency.

**Layout:**

Used Flexbox for aligning the header, lists, and task cards.

**Interactivity:**

Added hover effects and transitions.

**Responsive:**

Added a media query to stack elements on small screens.

---

## Step 7: Application Logic (api.js & app.js)

We connected the UI to the Backend.

**api.js:**

Created a wrapper around the browser's `fetch()` API to make cleaner calls (e.g., `API.createTask(...)`) instead of writing raw fetch code everywhere.

**app.js:**

- **State**: No complex state library; we just fetch and re-render the list on every change (`refreshTasks`).
- **Rendering**: A `renderTasks` function that loops through data and creates HTML elements (`div.task-card`) dynamically.
- **Events**: Attached listeners to "Add" buttons, "Delete" icons, "Complete" checks, and the "Edit" modal form.

---

## Step 8: Running the App

**Start Server:**
```bash
node server.js
```

in the `backend` folder.

**Access:**

Opened `http://localhost:3000`.

---

This modular approach ensures the code is maintainable, "resume-ready", and clearly separated into logical layers.
