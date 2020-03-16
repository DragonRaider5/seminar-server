`npm i && npm start` ausführen, um den Server auf `http://localhost:3000` zu starten.

## API

### GET /todos

```json
[
  {
    "id": "ddf4c7c3-72ab-44ea-b474-1bbea169f700",
    "text": "Repudiandae error voluptatibus quae velit quae est. Aut sunt voluptas explicabo rem. Repellendus sequi occaecati quo aut.",
    "createdAt": "2010-02-08T00:00:00.000Z",
    "status": "ACTIVE"
  }
]
```

Gültige Werte für Status: "ACTIVE", "OPEN" und "CLOSED".

### POST /todos

`Content-Type: application/json`

**Request:**

```json
{
  "text": "Hello World",
  "status": "OPEN"
}
```

`status` ist optional.

**Response:**

```json
{
  "id": "ddf4c7c3-72ab-44ea-b474-1bbea169f700",
  "text": "Hello World",
  "createdAt": "2010-02-08T00:00:00.000Z",
  "status": "OPEN"
}
```

### PATCH /todos/:id

**Request:**

```json
{
  "text": "Hello World",
  "status": "OPEN"
}
```

Alle Felder optional, mindestens eins muss gegeben werden.

**Response:**

```json
{
  "id": "{{id}}",
  "text": "Hello World",
  "createdAt": "2010-02-08T00:00:00.000Z",
  "status": "OPEN"
}
```

### DELETE /todos/:id

Selbsterklärend.