import type { TaskFieldValueEntity } from "./TaskFieldValueEntity.js";

export interface TaskEntity {
    id: number;
    title: string;
    taskOrder: number;
    taskFieldValues: TaskFieldValueEntity[];
}
