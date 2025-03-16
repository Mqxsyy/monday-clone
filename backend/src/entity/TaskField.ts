import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { TaskField as ITaskField } from "../types/TaskFields";
import { Board } from "./Board";

@Entity()
export class TaskField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("json")
    value: ITaskField;

    @ManyToOne(
        () => Board,
        (board) => board.taskFields,
        { onDelete: "CASCADE" },
    )
    board: Board;
}
