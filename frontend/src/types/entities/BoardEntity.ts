import type { TaskFieldEntity } from "./TaskFieldEntity.js";

export interface BoardEntity {
    id: number;
    title: string;
    taskFields: TaskFieldEntity[];
}
