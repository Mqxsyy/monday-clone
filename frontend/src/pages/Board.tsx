import { AiOutlinePlus } from "solid-icons/ai";
import { For } from "solid-js";
import TaskContextMenu from "../components/contextMenu/TaskContextMenu.jsx";
import TaskGroup from "../components/taskGroup/TaskGroup.jsx";
import { selectedBoard } from "../stores/boardStore.js";
import { ReloadTaskGroups, taskGroups } from "../stores/taskGroupStore.js";

export default function Board() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const addNewGroup = () => {
        const boardId = selectedBoard()?.id;
        if (!boardId) return;

        fetch(`${backendUrl}/taskGroups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "New Group",
                boardId: boardId,
            }),
        }).then((res) => {
            if (res.ok) {
                ReloadTaskGroups();
            }
        });
    };

    return (
        <div class="flex flex-col flex-1 h-0 ml-2 mt-4">
            <h1 class="text-2xl ml-9 font-semibold mb-8">{selectedBoard()?.title}</h1>
            <div class="flex-1 h-0 overflow-y-scroll">
                <For each={taskGroups()}>{(taskGroup, _) => <TaskGroup taskGroup={taskGroup} />}</For>
                <button class="btn btn-outline ml-9" type="button" onClick={addNewGroup}>
                    <AiOutlinePlus size={22} /> Add new group
                </button>
                <TaskContextMenu />
            </div>
        </div>
    );
}
