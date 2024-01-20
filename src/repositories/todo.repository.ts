import { ulid } from "ulid";
import { Todo } from "../models/todo.model";
import { IBaseRepository } from "./base.repository";

export class TodoRepository implements IBaseRepository<Todo> {
  private todos: Todo[] = [];

  constructor() {}

  async update(id: string, payload: Omit<Todo, "id">): Promise<Todo | null> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) return null;

    const updatedTodo = { ...todo, ...payload };

    this.todos = this.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    return updatedTodo;
  }

  async destroy(id: string): Promise<Todo | null> {
    const todo = this.todos.find((todo) => todo.id === id);
    this.todos = this.todos.filter((todo) => todo.id !== id);

    if (!todo) return null;

    return todo;
  }

  async getAll(): Promise<Todo[]> {
    return this.todos;
  }

  async getById(id: string): Promise<Todo | null> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  async create(todo: Omit<Todo, "id">): Promise<Todo> {
    const newTodo = { ...todo, id: ulid() };

    this.todos.push(newTodo);

    return newTodo;
  }
}
