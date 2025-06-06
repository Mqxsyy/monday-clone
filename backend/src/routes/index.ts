import { serve } from "@hono/node-server";
import { Hono } from "hono";
import board from "./board";
import task from "./task";
import taskGroup from "./taskGroup";
import workspace from "./workspace";
import taskField from "./taskField";

const app = new Hono();
app.get("/", (c) => c.text("Tasks App API"));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.route("/boards", board);
app.route("/taskGroups", taskGroup);
app.route("/tasks", task);
app.route("/workspaces", workspace);
app.route("/taskField", taskField)

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
