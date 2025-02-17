import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";
import { TaskGroup } from "./entity/TaskGroup";
import { Board } from "./entity/Board";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "monday-db",
    port: 3306,
    username: "root",
    password: "Root",
    database: "monday",
    synchronize: true,
    logging: false,
    entities: [Task, TaskGroup, Board, User],
    migrations: [],
    subscribers: [],
});

async () => {
    await AppDataSource.initialize();
};
