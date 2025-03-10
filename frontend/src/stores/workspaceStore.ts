import { createSignal } from "solid-js";
import type { Workspace } from "../types/Workspace.js";
import { ReloadBoards } from "./boardStore.js";

const [selectedWorkspace, setSelectedWorkspace] = createSignal<Workspace | undefined>();
const [workspaces, setWorkspaces] = createSignal<Workspace[]>();

export async function SelectWorkspace(workspace: Workspace) {
    setSelectedWorkspace(workspace);
    ReloadBoards();
}

export async function ReloadWorkspaces() {
    const response = await fetch("http://localhost:3006/workspaces");
    const data = await response.json();
    setWorkspaces(data);

    if (!selectedWorkspace() && data[0]) {
        SelectWorkspace(data[0]);
    }
}

export { selectedWorkspace, workspaces };
