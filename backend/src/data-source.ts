import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "monday-db",
    port: 3306,
    username: "root",
    password: "Root",
    database: "monday",
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/entity/*.js`],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
