export enum TodoStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Active = 'ACTIVE'
}

export interface Todo {
  id: string;
  createdAt: Date;
  text: string;
  status: TodoStatus;
}