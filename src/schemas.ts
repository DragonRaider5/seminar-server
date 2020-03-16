import Schema from 'validate'
import { TodoStatus } from './types'

export const newTodo = new Schema({
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(TodoStatus)
  }
})

export const todoPatch = new Schema({
  text: {
    type: String
  },
  status: {
    type: String,
    enum: Object.values(TodoStatus)
  }
})