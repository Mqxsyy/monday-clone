import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";

@Entity()
export class TaskField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("json")
    data: unknown;

    @ManyToOne(
        () => Board,
        (board) => board.taskFields,
    )
    board: Board;
}
