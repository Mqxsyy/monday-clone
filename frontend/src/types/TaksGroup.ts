import type { Task } from "./Task.js";

export interface TaskGroup {
    id: number;
    title: string;
    tasks: Task[];
}
