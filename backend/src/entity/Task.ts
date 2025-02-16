import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskGroup } from "./TaskGroup";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(
        () => TaskGroup,
        (taskGroup) => taskGroup.tasks,
    )
    taskGroup: TaskGroup;
}
