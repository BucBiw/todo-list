import { type } from "os"

export type Item = {
  key: string
  text: string
  date: Date
}

export interface User {
  id: string
  username: string
  email: string
  todoList: Item[]
  createAt: Date
}

export type SignupArgs = Pick<User, 'username' | 'email'> & {password: string}