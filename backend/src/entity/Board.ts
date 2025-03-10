import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskField } from "./TaskField";
import { TaskGroup } from "./TaskGroup";
import { Workspace } from "./Workspace";

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

    @ManyToOne(
        () => Workspace,
        (workspace) => workspace.boards,
    )
    workspace: Workspace;

    @OneToMany(
        () => TaskField,
        (taskField) => taskField.board,
    )
    taskFields: TaskField[];
}
