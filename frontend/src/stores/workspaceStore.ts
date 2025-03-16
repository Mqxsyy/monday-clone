import { createSignal } from "solid-js";
import type { WorkspaceEntity } from "../types/entities/WorkspaceEntity.js";
import { ReloadBoards } from "./boardStore.js";

const [selectedWorkspace, setSelectedWorkspace] = createSignal<WorkspaceEntity | undefined>();
const [workspaces, setWorkspaces] = createSignal<WorkspaceEntity[]>();

export async function SelectWorkspace(workspace: WorkspaceEntity) {
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
