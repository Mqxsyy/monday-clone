import { createSignal } from "solid-js";
import type { Board } from "../types/Board.js";
import { ReloadTaskGroups } from "./taskGroupStore.js";
import { selectedWorkspace } from "./workspaceStore.js";

const [selectedBoard, setSelectedBoard] = createSignal<Board | undefined>();
const [boards, setBoards] = createSignal<Board[]>([]);

export async function SelectBoard(board: Board) {
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
