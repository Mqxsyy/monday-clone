import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { TaskGroup } from "../entity/TaskGroup";
import CreateTask from "../utils/createTask";

const app = new Hono();

app.post("/", async (c) => {
    const { title, taskGroupId } = await c.req.json();
    const task = await CreateTask(title, taskGroupId);

    if (!task) {
        return c.json({ error: `TaskGroup with id ${taskGroupId} not found` }, 404);
    }

    return c.json({ message: "Task created", task }, 201);
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const task = await AppDataSource.manager.findOneBy(Task, {
        id: Number(id),
    });

    if (task) {
        return c.json(task, 200);
    }

    return c.json({ error: "Task not found" }, 404);
});

app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const { title, taskGroupId } = await c.req.json();

    const task = await AppDataSource.manager.findOneBy(Task, { id: Number(id) });

    if (!task) {
        return c.json({ error: "Task not found" }, 404);
    }

    if (taskGroupId) {
        const taskGroup = await AppDataSource.manager.findOneBy(TaskGroup, {
            id: Number(taskGroupId),
        });

        if (!taskGroup) {
            return c.json({ error: "Task group not found" }, 404);
        }

        task.taskGroup = taskGroup;
    }

    if (title) {
        task.title = title;
    }

    await AppDataSource.manager.save(task);

    return c.json({ message: "Task updated", task }, 200);
});

app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const task = await AppDataSource.manager.findOneBy(Task, { id: Number(id) });

    if (!task) {
        return c.json({ error: "Task not found" }, 404);
    }

    await AppDataSource.manager.remove(task);

    return c.json({ message: "Task deleted" }, 200);
});

export default app;
