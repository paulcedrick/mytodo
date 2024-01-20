import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { TodoRoutes } from "./routes/todo.route";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/todos", TodoRoutes);

export const handler = handle(app);
