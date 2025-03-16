import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { TaskFieldValue } from "../entity/TaskFieldValue";

const app = new Hono();

app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const { value } = await c.req.json();

    const taskFieldValue = await AppDataSource.manager.findOneBy(TaskFieldValue, { id: Number(id) });

    if (!taskFieldValue) {
        return c.json({ error: "TaskFieldValue not found" }, 404);
    }

    taskFieldValue.value.value = value;
    await AppDataSource.manager.save(taskFieldValue);

    return c.json({ message: "TaskFieldValue updated", taskFieldValue }, 200);
});

export default app;
