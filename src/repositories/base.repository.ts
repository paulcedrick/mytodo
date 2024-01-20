export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(todo: Omit<T, "id">): Promise<T>;
  update(id: string, todo: T): Promise<T | null>;
  destroy(id: string): Promise<T | null>;
}
