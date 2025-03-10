import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";
import { Task } from "./Task";

@Entity()
export class TaskGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    groupOrder: number;

    @Column()
    groupColor: string;

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
