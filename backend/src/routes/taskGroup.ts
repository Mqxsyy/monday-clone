import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";
import { TaskGroup } from "../entity/TaskGroup";
import CreateTaskGroup from "../utils/createTaskGroup";

const app = new Hono();

app.post("/", async (c) => {
    const { title, boardId } = await c.req.json();
    const taskGroup = await CreateTaskGroup(title, boardId);

    if (!taskGroup) {
        return c.json({ error: `Board with id ${boardId} not found` }, 404);
    }

    return c.json({ message: "Task group created", taskGroup }, 201);
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const taskGroup = await AppDataSource.manager.findOneBy(TaskGroup, {
        id: Number(id),
    });
    return taskGroup ? c.json(taskGroup) : c.json({ error: "Task group not found" }, 404);
});

app.get("/:id/tasks", async (c) => {
    const id = c.req.param("id");

    const taskGroup = await AppDataSource.manager.findOne(TaskGroup, {
        where: { id: Number(id) },
        relations: ["tasks", "tasks.taskFieldValues"],
    });

    return taskGroup ? c.json(taskGroup) : c.json({ error: "Task group not found" }, 404);
});

app.patch("/:id", async (c) => {
    const id = c.req.param("id");
    const { title, boardId } = await c.req.json();

    const taskGroup = await AppDataSource.manager.findOneBy(TaskGroup, {
        id: Number(id),
    });

    if (!taskGroup) {
        return c.json({ error: "Task group not found" }, 404);
    }

    if (boardId) {
        const board = await AppDataSource.manager.findOneBy(Board, {
            id: Number(boardId),
        });

        if (!board) {
            return c.json({ error: "Board not found" }, 404);
        }

        taskGroup.board = board;
    }

    if (title) {
        taskGroup.title = title;
    }

    await AppDataSource.manager.save(taskGroup);

    return c.json({ message: "Task group updated", taskGroup });
});

app.delete("/:id", async (c) => {
    const id = c.req.param("id");

    const taskGroup = await AppDataSource.manager.findOneBy(TaskGroup, {
        id: Number(id),
    });

    if (!taskGroup) {
        return c.json({ error: "Task group not found" }, 404);
    }

    await AppDataSource.manager.remove(taskGroup);

    return c.json({ message: "Task group deleted" });
});

export default app;
