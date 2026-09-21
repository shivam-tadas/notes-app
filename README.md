# Notes REST API (Beginner Express.js Project)

A simple beginner-friendly Notes application built with **Node.js** and **Express.js**.  
It provides a basic REST API to Create, Read, Update, and Delete notes.  
(There is also a CLI version with notes stored in memory included as a seperate file.)

## Features

- View all notes
- Get a single note by ID
- Create a new note
- Update an existing note
- Delete a note
- In-memory storage (data resets when the server restarts)
- Basic input validation and error handling

## Tech Stack

- Node.js
- Express.js
- Built-in `readline` module (for the optional CLI)

## Prerequisites

- Node.js (v14 or higher recommended)
- npm

## Installation

1. Clone the repository (or copy the project files):
   ```bash
   git clone https://github.com/shivam-tadas/notes-app.git
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   npm install express
   ```

## Running the Project

Start the server:

```bash
node notes.js
```

OR run the CLI program

```bash
node notesCli.js
```

The API will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint       | Description                  | Request Body                  |
|--------|----------------|------------------------------|-------------------------------|
| GET    | `/`            | Welcome message              | -                             |
| GET    | `/notes`       | Get all notes                | -                             |
| GET    | `/notes/:id`   | Get a single note by ID      | -                             |
| POST   | `/notes`       | Create a new note            | `{ "content": "Your note" }`  |
| PUT    | `/notes/:id`   | Update an existing note      | `{ "content": "Updated note" }` |
| DELETE | `/notes/:id`   | Delete a note by ID          | -                             |

### Example Requests

#### Get all notes
```bash
curl http://localhost:3000/notes
```

#### Get a note by ID
```bash
curl http://localhost:3000/notes/1
```

#### Create a new note
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"content": "Buy groceries"}'
```

#### Update a note
```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"content": "Buy groceries and milk"}'
```

#### Delete a note
```bash
curl -X DELETE http://localhost:3000/notes/1
```

## Sample Response

```json
[
  {
    "id": 1,
    "content": "Learn Node.js"
  },
  {
    "id": 2,
    "content": "Build something"
  }
]
```

## Project Structure

```
.
├── node_modules/
├── .gitignore
├── notes.js
├── notesCli.js
├── package.json
├── package-lock.json
└── README.md
```

## Notes

- Data is stored **in memory**. Restarting the server will reset all notes.
- IDs are auto-incremented.
- Basic validation is included (empty content, invalid IDs, etc.).
- This is a beginner project meant for learning Express routing, request handling, and REST principles.