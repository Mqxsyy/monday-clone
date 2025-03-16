import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskFieldValue } from "./TaskFieldValue";
import { TaskGroup } from "./TaskGroup";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    taskOrder: number;

    @OneToMany(
        () => TaskFieldValue,
        (taskFieldValue) => taskFieldValue.task,
    )
    taskFieldValues: TaskFieldValue[];

    @ManyToOne(
        () => TaskGroup,
        (taskGroup) => taskGroup.tasks,
        { onDelete: "CASCADE" },
    )
    taskGroup: TaskGroup;
}
