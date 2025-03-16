import type { TaskEntity } from "./TaskEntity.js";

export interface TaskGroupEntity {
    id: number;
    title: string;
    groupOrder: number;
    groupColor: string;
    tasks: TaskEntity[];
}
