import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskGroup } from "./TaskGroup";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(
        () => TaskGroup,
        (taskGroup) => taskGroup.board,
    )
    taskGroups: TaskGroup[];
}
