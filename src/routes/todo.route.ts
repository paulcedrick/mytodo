import { Hono } from "hono";
import { TodoRepository } from "../repositories/todo.repository";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const TodoRoutes = new Hono();

const todoRepository = new TodoRepository();

const getAllTodoQueries = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
TodoRoutes.get("/", async (c) => {
  try {
    const parseResult = getAllTodoQueries.safeParse(c.req.query());

    if (!parseResult.success) {
      return c.json({ error: parseResult.error }, 400);
    }

    const queries = parseResult.data;

    let limit = queries.limit ?? 10;
    let offset = queries.offset ?? 0;
    let order = queries.order ?? "asc";

    const pagination = { limit, offset, order };

    const todos = await todoRepository.getAll(pagination);

    return c.json({ data: todos });
  } catch (err: unknown) {
    return c.json({ error: err }, 500);
  }
});

TodoRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const todo = await todoRepository.getById(id);

    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json({ data: todo });
  } catch (err: unknown) {
    return c.json({ error: err }, 500);
  }
});

export const createTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).optional(),
  isDone: z.boolean().optional().default(false),
});
TodoRoutes.post("/", zValidator("json", createTodoSchema), async (c) => {
  try {
    const json = c.req.valid("json");

    const todo = await todoRepository.create(json);

    return c.json({ data: todo });
  } catch (err: unknown) {
    return c.json({ error: err });
  }
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).optional(),
  isDone: z.boolean(),
});
TodoRoutes.put("/:id", zValidator("json", updateTodoSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const json = c.req.valid("json");

    const todo = await todoRepository.update(id, json);

    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json({ data: todo });
  } catch (err: unknown) {
    return c.json({ error: err }, 500);
  }
});

TodoRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const todo = await todoRepository.destroy(id);

    if (!todo) {
      return c.json({ error: "Todo not found" }, 404);
    }

    return c.json({ data: todo });
  } catch (err: unknown) {
    return c.json({ error: err }, 500);
  }
});
