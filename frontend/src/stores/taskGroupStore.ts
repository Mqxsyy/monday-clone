import { createSignal } from "solid-js";
import type { TaskGroupEntity } from "../types/entities/TaskGroupEntity.js";
import { selectedBoard } from "./boardStore.js";

const [taskGroups, setTaskGroups] = createSignal<TaskGroupEntity[]>([]);

export async function ReloadTaskGroups() {
    const board = selectedBoard();

    if (!board) {
        return;
    }

    const response1 = await fetch(`http://localhost:3006/boards/${board.id}`);
    const data = await response1.json();

    const taskGroups: TaskGroupEntity[] = [];

    for (const taskGroup of data.taskGroups) {
        const response2 = await fetch(`http://localhost:3006/taskGroups/${taskGroup.id}/tasks`);
        const data = await response2.json();
        taskGroups.push(data);
    }

    setTaskGroups(taskGroups);
}

export { taskGroups };
