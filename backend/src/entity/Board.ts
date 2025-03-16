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
        () => TaskField,
        (taskField) => taskField.board,
    )
    taskFields: TaskField[];

    @OneToMany(
        () => TaskGroup,
        (taskGroup) => taskGroup.board,
    )
    taskGroups: TaskGroup[];

    @ManyToOne(
        () => Workspace,
        (workspace) => workspace.boards,
        { onDelete: "CASCADE" },
    )
    workspace: Workspace;
}
