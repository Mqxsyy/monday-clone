import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { TaskFieldValue as ITaskFieldValue } from "../types/TaskFields";
import { Task } from "./Task";

@Entity()
export class TaskFieldValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("json")
    value: ITaskFieldValue;

    @ManyToOne(
        () => Task,
        (task) => task.taskFieldValues,
        { onDelete: "CASCADE" },
    )
    task: Task;
}
