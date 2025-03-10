import { AiOutlinePlus } from "solid-icons/ai";
import { BsThreeDots } from "solid-icons/bs";
import { Index } from "solid-js";
import { SelectBoard, boards } from "../stores/boardStore.js";
import { ReloadWorkspaces, SelectWorkspace, selectedWorkspace, workspaces } from "../stores/workspaceStore.js";
import SidebarButton from "./SidebarButton.jsx";
import { toggleCreateBoardModal } from "./modals/CreateBoardModal.jsx";
import { toggleCreateWorkspaceModal } from "./modals/CreateWorkspaceModal.jsx";

export default function SideBar() {
    ReloadWorkspaces();

    return (
        <div class="flex flex-col bg-base-100 w-3xs py-2 mr-2 rounded-tr-lg h-full">
            <div class="flex flex-col mx-4">
                <SidebarButton text="Home" path="/" />
                <SidebarButton text="My Work" path="/" />
                <SidebarButton text="More" path="/" />
            </div>
            <div class="divider m-0" />

            <div class="flex flex-col mx-4">
                <SidebarButton text={"Favorites"} path="/" />
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
                        {selectedWorkspace() ? selectedWorkspace()?.title : "No workspace"}
                    </button>

                    <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box p-2 shadow-sm w-48">
                        <Index each={workspaces()}>
                            {(item, _) => (
                                <li>
                                    <button type="button" onClick={() => SelectWorkspace(item())}>
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
                <Index each={boards()}>
                    {(item, _) => (
                        <SidebarButton text={item().title} path="/board" onClick={() => SelectBoard(item())} />
                    )}
                </Index>
            </div>
        </div>
    );
}
