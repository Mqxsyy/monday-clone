import { createSignal } from "solid-js";
import type { TaskGroup } from "../types/TaksGroup.js";
import { selectedBoard } from "./boardStore.js";

const [taskGroups, setTaskGroups] = createSignal<TaskGroup[]>([]);

export async function ReloadTaskGroups() {
    const board = selectedBoard();

    if (!board) {
        return;
    }

    const response1 = await fetch(`http://localhost:3006/boards/${board.id}`);
    const data = await response1.json();

    setTaskGroups([]);

    for (const taskGroup of data.taskGroups) {
        const response2 = await fetch(`http://localhost:3006/taskGroups/${taskGroup.id}`);
        const data = await response2.json();
        setTaskGroups((prev) => [...prev, data]);
    }
}

export { taskGroups };
