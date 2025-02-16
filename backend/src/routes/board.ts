import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";

const app = new Hono();

app.post("/", async (c) => {
    const { title } = await c.req.json();

    const board = new Board();
    board.title = title;

    await AppDataSource.manager.save(board);

    return c.json({ message: "Board created", board }, 201);
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
