import { AiOutlinePlus } from "solid-icons/ai";
import { BsThreeDots } from "solid-icons/bs";
import { Index, createSignal } from "solid-js";
import SidebarButton from "./SidebarButton.jsx";
import { toggleCreateBoardModal } from "./modals/CreateBoardModal.jsx";
import { toggleCreateWorkspaceModal } from "./modals/CreateWorkspaceModal.jsx";

interface Workspace {
    id: number;
    title: string;
}

interface Board {
    id: number;
    title: string;
}

export const [selectedWorkspaceId, setSelectedWorkspaceId] = createSignal(-1);

const [selectedWorkspaceName, setSelectedWorkspaceName] = createSignal("No workspace");
const [workspaces, setWorkspaces] = createSignal([] as Workspace[]);
const [boards, setBoards] = createSignal([] as Board[]);

export const ReloadSidebarBoards = async () => {
    if (selectedWorkspaceId() === -1) {
        return;
    }

    const response = await fetch(`http://localhost:3006/workspaces/${selectedWorkspaceId()}`);
    const data = await response.json();
    setBoards(data.boards);
};

const selectSidebarWorkspace = async (id: number, title: string) => {
    await fetch(`http://localhost:3006/workspaces/${id}`);

    setSelectedWorkspaceName(title);
    setSelectedWorkspaceId(id);

    ReloadSidebarBoards();
};

export const ReloadSidebarWorkspaces = async () => {
    const response = await fetch("http://localhost:3006/workspaces");
    const data = await response.json();
    setWorkspaces(data);

    if (selectedWorkspaceId() === -1 && data[0]) {
        selectSidebarWorkspace(data[0].id, data[0].title);
    }
};

export default function SideBar() {
    ReloadSidebarWorkspaces();

    return (
        <div class="flex flex-col bg-base-100 w-3xs py-2 mr-2 rounded-tr-lg h-full">
            <div class="flex flex-col mx-4">
                <SidebarButton text={"Home"} />
                <SidebarButton text={"My Work"} />
                <SidebarButton text={"More"} />
            </div>
            <div class="divider m-0" />

            <div class="flex flex-col mx-4">
                <SidebarButton text={"Favorites"} />
            </div>
            <div class="divider m-0" />

            <div class="flex flex-row mx-2 justify-between mb-1">
                <p class="px-4 py-2 text-sm font-semibold">Workspaces</p>
                <div class="dropdown">
                    <button tabindex="0" class="btn btn-ghost px-3" type="button">
                        <BsThreeDots size={16} />
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box p-2 shadow-sm w-48">
                        <li>
                            <button type="button" onClick={toggleCreateWorkspaceModal}>
                                <AiOutlinePlus />
                                Add new workspace
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex flex-row ml-4 mr-1 mb-2">
                <div class="dropdown grow mr-2">
                    <button tabindex="0" class="btn m-1 btn-ghost btn-outline w-full" type="button">
                        {selectedWorkspaceName()}
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box p-2 shadow-sm w-48">
                        <Index each={workspaces()}>
                            {(item, _) => (
                                <li>
                                    <button
                                        type="button"
                                        onClick={() => selectSidebarWorkspace(item().id, item().title)}
                                    >
                                        {item().title}
                                    </button>
                                </li>
                            )}
                        </Index>
                    </ul>
                </div>

                <div class="dropdown">
                    <button tabindex="0" class="btn m-1 btn-primary p-3" type="button">
                        <AiOutlinePlus size={18} />
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box p-2 shadow-sm w-48">
                        <p class="m-2 text-base-content/75">Add new</p>
                        <li>
                            <button type="button" onClick={toggleCreateBoardModal}>
                                Board
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex flex-col mx-4">
                <Index each={boards()}>{(item, _) => <SidebarButton text={item().title} />}</Index>
            </div>
        </div>
    );
}
