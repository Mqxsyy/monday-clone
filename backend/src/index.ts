import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = new Hono();

app.get("/", (c) => {
    AppDataSource.initialize()
        .then(async () => {
            console.log("Inserting a new user into the database...");
            const user = new User();
            user.firstName = "Timber";
            user.lastName = "Saw";
            user.age = 25;
            await AppDataSource.manager.save(user);
            console.log(`Saved a new user with id: ${user.id}`);

            console.log("Loading users from the database...");
            const users = await AppDataSource.manager.find(User);
            console.log("Loaded users: ", users);

            console.log("Here you can setup and run express / fastify / any other framework.");
        })
        .catch((error) => console.log(error));

    return c.text("Hello Hono 3!");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
