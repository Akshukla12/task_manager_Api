# 📝 Task Manager REST API

A clean, beginner-friendly **REST API** built with **Node.js** and **Express**.
Supports full CRUD operations on tasks with in-memory storage, filter/sort query params, and proper HTTP status codes throughout.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | Web framework / routing |
| [Nodemon](https://nodemon.io/) | Auto-restart in development |

> No database — tasks are stored **in memory** and reset on every server restart.

---

## 📁 Folder Structure

```
task-manager-api/
├── controllers/
│   └── taskController.js   # All business logic (create, read, update, delete)
├── routes/
│   └── taskRoutes.js       # Route definitions — maps URLs to controller functions
├── server.js               # Entry point — sets up Express, middleware, and routes
├── package.json            # Project metadata and npm scripts
└── README.md
```

**How the layers connect:**

```
Postman / Client
      │
      ▼
  server.js          ← boots Express, registers middleware, mounts routes
      │
      ▼
taskRoutes.js        ← decides which controller function handles the request
      │
      ▼
taskController.js    ← runs the actual logic and sends the response
```

---

## ⚙️ Installation & Setup

### 1. Clone or download the project

```bash
git clone <your-repo-url>
cd task-manager-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

**Development mode** *(auto-restarts on file changes)*:
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start at:
```
http://localhost:5000
```

---

## 🗂️ Task Object Structure

Every task returned by the API has this shape:

```json
{
  "id": 1,
  "title": "Study Node.js",
  "description": "Complete the Express REST API project",
  "status": "pending",
  "createdAt": "2025-04-13T16:30:00.000Z"
}
```

| Field | Type | Description |
|---|---|---|
| `id` | Number | Auto-incremented unique identifier |
| `title` | String | Required. Name of the task |
| `description` | String | Optional. Extra detail about the task |
| `status` | String | `"pending"` (default) or `"done"` |
| `createdAt` | String | ISO 8601 timestamp of when task was created |

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get a single task by ID |
| `PUT` | `/api/tasks/:id` | Update a task's title and/or description |
| `PATCH` | `/api/tasks/:id/done` | Mark a task as done |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## 📖 Endpoint Examples

### ➕ POST `/api/tasks` — Create a task

**Request:**
```http
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Study Node.js",
  "description": "Complete the Express REST API project"
}
```

**Response** `201 Created`:
```json
{
  "id": 1,
  "title": "Study Node.js",
  "description": "Complete the Express REST API project",
  "status": "pending",
  "createdAt": "2025-04-13T16:30:00.000Z"
}
```

---

### 📋 GET `/api/tasks` — Get all tasks

**Request:**
```http
GET http://localhost:5000/api/tasks
```

**Response** `200 OK`:
```json
[
  {
    "id": 1,
    "title": "Study Node.js",
    "description": "Complete the Express REST API project",
    "status": "pending",
    "createdAt": "2025-04-13T16:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Build a portfolio",
    "description": "Showcase Node.js projects",
    "status": "done",
    "createdAt": "2025-04-13T17:00:00.000Z"
  }
]
```

---

### 🔍 GET `/api/tasks/:id` — Get a task by ID

**Request:**
```http
GET http://localhost:5000/api/tasks/1
```

**Response** `200 OK`:
```json
{
  "id": 1,
  "title": "Study Node.js",
  "description": "Complete the Express REST API project",
  "status": "pending",
  "createdAt": "2025-04-13T16:30:00.000Z"
}
```

---

### ✏️ PUT `/api/tasks/:id` — Update a task

Send **at least one** of `title` or `description`.

**Request:**
```http
PUT http://localhost:5000/api/tasks/1
Content-Type: application/json

{
  "title": "Master Node.js",
  "description": "Build and deploy a full API"
}
```

**Response** `200 OK`:
```json
{
  "id": 1,
  "title": "Master Node.js",
  "description": "Build and deploy a full API",
  "status": "pending",
  "createdAt": "2025-04-13T16:30:00.000Z"
}
```

---

### ✅ PATCH `/api/tasks/:id/done` — Mark as done

No request body needed.

**Request:**
```http
PATCH http://localhost:5000/api/tasks/1/done
```

**Response** `200 OK`:
```json
{
  "id": 1,
  "title": "Master Node.js",
  "description": "Build and deploy a full API",
  "status": "done",
  "createdAt": "2025-04-13T16:30:00.000Z"
}
```

---

### 🗑️ DELETE `/api/tasks/:id` — Delete a task

**Request:**
```http
DELETE http://localhost:5000/api/tasks/1
```

**Response** `200 OK`:
```json
{
  "message": "Task deleted successfully.",
  "task": {
    "id": 1,
    "title": "Master Node.js",
    "description": "Build and deploy a full API",
    "status": "done",
    "createdAt": "2025-04-13T16:30:00.000Z"
  }
}
```

---

## 🔎 Bonus: Filter & Sort Query Params

These work on `GET /api/tasks` to slice and order results.

### Filter by status

```http
GET http://localhost:5000/api/tasks?status=pending
GET http://localhost:5000/api/tasks?status=done
```

### Sort by creation date (oldest → newest)

```http
GET http://localhost:5000/api/tasks?sort=createdAt
```

### Combine filter + sort

```http
GET http://localhost:5000/api/tasks?status=pending&sort=createdAt
```

**Response** `200 OK` *(only matching tasks, sorted)*:
```json
[
  {
    "id": 1,
    "title": "Study Node.js",
    "status": "pending",
    "createdAt": "2025-04-13T16:30:00.000Z"
  }
]
```

---

## ❌ Error Responses

All errors return a JSON object with an `error` key and an appropriate HTTP status code.

### 400 Bad Request — Missing or invalid title

```json
{
  "error": "title is required and must be a non-empty string."
}
```

### 400 Bad Request — Nothing to update

```json
{
  "error": "Provide at least one field to update: title or description."
}
```

### 400 Bad Request — Invalid status filter

```json
{
  "error": "Invalid status value. Allowed values: pending, done."
}
```

### 404 Not Found — Task does not exist

```json
{
  "error": "Task with id 99 not found."
}
```

### 404 Not Found — Unknown route

```json
{
  "error": "Route not found"
}
```

### 405 Method Not Allowed — Unsupported HTTP method

```json
{
  "error": "Method Not Allowed",
  "allowedMethods": ["GET", "POST"]
}
```

---

## 🧠 How It Works (Beginner Explanation)

### Why in-memory storage?

The `tasks` array in `taskController.js` acts as a temporary database.
It's the simplest way to get a working API without setting up MongoDB or PostgreSQL.

> ⚠️ **Limitation:** All data is lost when the server restarts. A real production app would use a database.

### How does auto-increment ID work?

```js
let currentId = 1;

// When creating a task:
newTask.id = currentId;  // assign current value
currentId++;             // increment for the next task
```

Each task gets a unique ID that never repeats, even after a task is deleted.

### Why use Number(req.params.id)?

URL parameters like `:id` always come in as **strings** (e.g., `"1"`).
The tasks array stores IDs as **numbers** (e.g., `1`).
`"1" === 1` is `false` in JavaScript, so the lookup would always fail without the conversion.

```js
const id = Number(req.params.id);  // "1" → 1
```

---

## 📜 npm Scripts

| Command | Description |
|---|---|
| `npm start` | Start server with Node.js |
| `npm run dev` | Start server with Nodemon (auto-restart) |

---

## 👤 Author

Built as a learning project for Node.js + Express REST API development.
