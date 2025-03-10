import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";
import { Task } from "../entity/Task";
import { TaskGroup } from "../entity/TaskGroup";
import { Workspace } from "../entity/Workspace";

const app = new Hono();

function createTaskgroup(taskGroupTitle: string, order: number, board: Board) {
    const taskGroup = new TaskGroup();
    taskGroup.title = taskGroupTitle;
    taskGroup.groupOrder = order;
    taskGroup.groupColor = "#FFFFFF";
    taskGroup.board = board;
    return taskGroup;
}

function createTask(taskTitle: string, order: number, taskGroup: TaskGroup) {
    const task = new Task();
    task.title = taskTitle;
    task.taskOrder = order;
    task.fieldData = {};
    task.taskGroup = taskGroup;
    return task;
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

    let groupOrder = 0;
    let taskOrder = 0;

    const taskGroup1 = createTaskgroup("Group Title", ++groupOrder, board);
    const task1 = createTask("Task 1", ++taskOrder, taskGroup1);
    const task2 = createTask("Task 2", ++taskOrder, taskGroup1);
    const task3 = createTask("Task 3", ++taskOrder, taskGroup1);

    const taskGroup2 = createTaskgroup("Group Title", ++groupOrder, board);
    const task4 = createTask("Task 4", ++taskOrder, taskGroup2);
    const task5 = createTask("Task 5", ++taskOrder, taskGroup2);

    await AppDataSource.manager.save([board, taskGroup1, taskGroup2, task1, task2, task3, task4, task5]);

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
