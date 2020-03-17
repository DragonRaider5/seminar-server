import * as express from 'express'
import { json } from 'body-parser'
import * as cors from 'cors'
import * as casual from 'casual'
import { v4 as uuid } from 'uuid'

import { Todo, TodoStatus } from './types'
import * as schemas from './schemas'

const app = express()

const todos = new Map<Todo['id'], Todo>()
for (let i = 0; i < 10; i++) {
  const id = uuid()
  todos.set(id, {
    id,
    text: casual.text,
    createdAt: new Date(casual.date()),
    status: casual.random_value(TodoStatus)
  })
}

app.use(json())
app.use(cors())

app.get('/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Transfer-Encoding', 'chunked')

  res.write('[')
  const length = todos.size
  let index = 0
  for (const todo of todos.values()) {
    res.write(JSON.stringify(todo))
    if (++index < length) {
      res.write(',')
    }
  }
  res.write(']')

  res.end()
})

const ensureContentType = (contentType: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.header('content-type') !== contentType) {
    return res.status(400).send(`Bad Content-Type. Expected ${contentType}.`)
  }

  next()
}

app.post('/todos', ensureContentType('application/json'), (req, res) => {
  const validationErrors = schemas.newTodo.validate(req.body)
  if (validationErrors.length > 0) {
    return res.status(400).send(validationErrors.map(({ path, message }: any) => ({ path, message })))
  }

  if (typeof req.body.status === 'undefined') {
    req.body.status = TodoStatus.Open
  }

  const id = uuid()
  todos.set(id, {
    ...req.body,
    createdAt: new Date(),
    id
  })

  res.status(201).send(todos.get(id))
})

const ensureTodoExistence = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const todoId = req.params.id
  if (!todos.has(todoId)) {
    return res.sendStatus(404)
  }

  next()
}

app.patch('/todos/:id', ensureContentType('application/json'), ensureTodoExistence, (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('Expected payload not to be empty.')
  }

  const validationErrors = schemas.todoPatch.validate(req.body)
  if (validationErrors.length > 0) {
    return res.status(400).send(validationErrors.map(({ path, message }: any) => ({ path, message })))
  }

  todos.set(req.params.id, {
    ...todos.get(req.params.id),
    ...req.body
  })

  res.status(200).send(todos.get(req.params.id))
})

app.delete('/todos/:id', ensureTodoExistence, (req, res) => {
  todos.delete(req.params.id)
  res.sendStatus(204)
})

app.listen(3000, () => {
  console.log('Server listening on port 3000!')
})