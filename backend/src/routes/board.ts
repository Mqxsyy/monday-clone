import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";
import { TaskField } from "../entity/TaskField";
import { Workspace } from "../entity/Workspace";
import CreateTask from "../utils/createTask";
import CreateTaskGroup from "../utils/createTaskGroup";

const app = new Hono();

app.post("/", async (c) => {
    const { title, workspaceId } = await c.req.json();

    const workspace = await AppDataSource.manager.findOneBy(Workspace, {
        id: Number(workspaceId),
    });

    if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
    }

    const board = new Board();
    board.title = title;
    board.workspace = workspace;

    const textField = new TaskField();
    textField.value = { type: "TextField", name: "Text" };
    textField.board = board;

    await AppDataSource.manager.save([board, textField]);

    const taskGroup1 = await CreateTaskGroup("Group Title", board.id);
    CreateTask("Task 1", taskGroup1.id);
    CreateTask("Task 2", taskGroup1.id);
    CreateTask("Task 3", taskGroup1.id);

    const taskGroup2 = await CreateTaskGroup("Group Title", board.id);
    CreateTask("Task 4", taskGroup2.id);
    CreateTask("Task 5", taskGroup2.id);

    return c.json({ message: "Board created", board: board }, 201);
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");

    const board = await AppDataSource.manager.findOne(Board, {
        where: {
            id: Number(id),
        },
        relations: ["taskGroups"],
    });

    if (!board) {
        return c.json({ error: "Board not found" }, 404);
    }

    return c.json(board);
});

app.put("/:id", async (c) => {
    const id = c.req.param("id");
    const { title } = await c.req.json();

    const board = await AppDataSource.manager.findOneBy(Board, {
        id: Number(id),
    });

    if (!board) {
        return c.json({ error: "Board not found" }, 404);
    }

    board.title = title;

    await AppDataSource.manager.save(board);

    return c.json({ message: "Board updated", board });
});

app.delete("/:id", async (c) => {
    const id = c.req.param("id");

    const board = await AppDataSource.manager.findOneBy(Board, {
        id: Number(id),
    });

    if (!board) {
        return c.json({ error: "Board not found" }, 404);
    }

    await AppDataSource.manager.remove(board);

    return c.json({ message: "Board deleted" });
});

export default app;
