import { Hono } from "hono";
import { AppDataSource } from "../data-source";
import { Workspace } from "../entity/Workspace";

const app = new Hono();

app.get("/", async (c) => {
    const workspaces = await AppDataSource.manager.find(Workspace);

    return c.json(workspaces);
});

app.post("/", async (c) => {
    const { title } = await c.req.json();

    const workspace = new Workspace();
    workspace.title = title;

    await AppDataSource.manager.save(workspace);

    return c.json({ message: "Workspace created", workspace: workspace }, 201);
});

app.get("/:id", async (c) => {
    const id = c.req.param("id");

    const workspace = await AppDataSource.manager.findOne(Workspace, {
        where: {
            id: Number(id),
        },
        relations: ["boards", "boards.taskFields"],
    });

    if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
    }

    return c.json(workspace);
});

app.put("/:id", async (c) => {
    const id = c.req.param("id");
    const { title } = await c.req.json();

    const workspace = await AppDataSource.manager.findOneBy(Workspace, {
        id: Number(id),
    });

    if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
    }

    workspace.title = title;

    await AppDataSource.manager.save(workspace);

    return c.json({ message: "Workspace updated", workspace: workspace });
});

app.delete("/:id", async (c) => {
    const id = c.req.param("id");

    const workspace = await AppDataSource.manager.findOneBy(Workspace, {
        id: Number(id),
    });

    if (!workspace) {
        return c.json({ error: "Workspace not found" }, 404);
    }

    await AppDataSource.manager.remove(workspace);

    return c.json({ message: "Workspace deleted" });
});

export default app;
