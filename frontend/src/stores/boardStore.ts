import { createSignal } from "solid-js";
import type { BoardEntity } from "../types/entities/BoardEntity.js";
import { ReloadTaskGroups } from "./taskGroupStore.js";
import { selectedWorkspace } from "./workspaceStore.js";

const [selectedBoard, setSelectedBoard] = createSignal<BoardEntity | undefined>();
const [boards, setBoards] = createSignal<BoardEntity[]>([]);

export async function SelectBoard(board: BoardEntity) {
    setSelectedBoard(board);
    ReloadTaskGroups();
}

export async function ReloadBoards() {
    const workspace = selectedWorkspace();

    if (!workspace) {
        return;
    }

    const response = await fetch(`http://localhost:3006/workspaces/${workspace.id}`);
    const data = await response.json();
    setBoards(data.boards);

    if (!selectedBoard() && data.boards[0]) {
        SelectBoard(data.boards[0]);
    }
}

export { selectedBoard, boards };
