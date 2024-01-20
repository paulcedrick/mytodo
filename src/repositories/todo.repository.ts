import { ulid } from "ulid";
import { Todo } from "../models/todo.model";
import { IBaseRepository } from "./base.repository";

export class TodoRepository implements IBaseRepository<Todo> {
  private todos: Todo[] = [];

  constructor() {}

  async update(id: string, payload: Omit<Todo, "id">): Promise<Todo | null> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) return null;

    const updatedTodo = {
      ...todo,
      ...payload,
      updatedAt: Date.now().toString(),
    };

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

  async getAll(opts?: { limit?: number; offset?: number }): Promise<Todo[]> {
    if (opts) {
      const limit = opts.limit ?? 10;
      const offset = opts.offset ?? 0;

      return this.todos.slice(offset, offset + limit);
    }

    return this.todos;
  }

  async getById(id: string): Promise<Todo | null> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      return null;
    }

    return todo;
  }

  async create(
    todo: Omit<Todo, "id" | "updatedAt" | "createdAt">
  ): Promise<Todo> {
    const newTodo = {
      ...todo,
      id: ulid(),
      createdAt: Date.now().toString(),
      updatedAt: undefined,
    };

    this.todos.push(newTodo);

    return newTodo;
  }
}
