# Notes App

A small Node.js notes project with two ways to use notes:

- An Express API backed by MongoDB through Mongoose
- A separate interactive command-line interface (CLI) that keeps notes in memory

## Requirements

- Node.js
- npm
- A MongoDB database connection string

## Installation

```bash
git clone https://github.com/shivam-tadas/notes-app.git
cd notes-app
npm install
```

Create a `.env` file in the project root:

```env
MONGODB_URI=your-mongodb-connection-string
HELLO=your-name
```

`MONGODB_URI` is required for the API to start. `HELLO` is used by the welcome endpoint; if omitted, its value is returned as `undefined`.

## Run the MongoDB API

```bash
node notes.js
```

The server runs at `http://localhost:3000` after a successful MongoDB connection.

### Implemented API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Returns a greeting using the `HELLO` environment variable. |
| GET | `/notes` | Returns all notes stored in MongoDB. |

Example requests:

```bash
curl http://localhost:3000/
curl http://localhost:3000/notes
```

Notes returned by the API use the Mongoose model shape:

```json
{
  "_id": "...",
  "content": "Learn Node.js",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

The routes for getting one note, creating, updating, and deleting notes are present in `notes.js` but do not yet have implementations. They are therefore not listed as available API operations.

## Run the CLI

```bash
node notesCli.js
```

The CLI starts with two sample notes and provides options to:

- View notes
- Add a note
- Delete a note by ID
- Edit a note by ID
- Search notes
- Exit

CLI notes are held only in memory and reset every time the program starts. The CLI does not use MongoDB.

## Project structure

```text
.
├── models/
│   └── Note.js          # Mongoose note model
├── notes.js             # MongoDB-backed Express API
├── notesCli.js          # Interactive in-memory CLI
├── notesInMemory.js     # Earlier in-memory Express API implementation
├── package.json
└── README.md
```

## Dependencies

- `express` for the web server
- `mongoose` for MongoDB models and connectivity
- `dotenv` for environment-variable loading
