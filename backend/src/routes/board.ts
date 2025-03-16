import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";
import { Task } from "../entity/Task";
import { TaskField } from "../entity/TaskField";
import { TaskFieldValue } from "../entity/TaskFieldValue";
import { TaskGroup } from "../entity/TaskGroup";
import { Workspace } from "../entity/Workspace";
import GetRandomGroupColor from "../utils/getRandomGroupColor";

const app = new Hono();

async function createTaskgroup(taskGroupTitle: string, order: number, board: Board) {
    const taskGroup = new TaskGroup();
    taskGroup.title = taskGroupTitle;
    taskGroup.groupOrder = order;
    taskGroup.groupColor = GetRandomGroupColor();
    taskGroup.board = board;

    await AppDataSource.manager.save(taskGroup);

    return taskGroup;
}

async function createTask(taskTitle: string, order: number, taskGroup: TaskGroup) {
    const task = new Task();
    task.title = taskTitle;
    task.taskOrder = order;
    task.taskGroup = taskGroup;

    const textFieldValue = new TaskFieldValue();
    textFieldValue.value = { type: "TextField", value: "" };
    textFieldValue.task = task;

    await AppDataSource.manager.save([task, textFieldValue]);
}

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

    let groupOrder = 0;
    let taskOrder = 0;

    const taskGroup1 = await createTaskgroup("Group Title", ++groupOrder, board);
    createTask("Task 1", ++taskOrder, taskGroup1);
    createTask("Task 2", ++taskOrder, taskGroup1);
    createTask("Task 3", ++taskOrder, taskGroup1);

    const taskGroup2 = await createTaskgroup("Group Title", ++groupOrder, board);
    createTask("Task 4", ++taskOrder, taskGroup2);
    createTask("Task 5", ++taskOrder, taskGroup2);

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
