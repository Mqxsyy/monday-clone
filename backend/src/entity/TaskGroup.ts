import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";
import { Board } from "./Board";

@Entity()
export class TaskGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(
        () => Task,
        (task) => task.taskGroup,
    )
    tasks: Task[];

    @ManyToOne(
        () => Board,
        (board) => board.taskGroups,
    )
    board: Board;
}
