import { Index } from "solid-js";
import TaskContextMenu from "../components/contextMenu/TaskContextMenu.jsx";
import TaskGroup from "../components/taskGroup/TaskGroup.jsx";
import { selectedBoard } from "../stores/boardStore.js";
import { taskGroups } from "../stores/taskGroupStore.js";

export default function Board() {
    return (
        <div class="ml-8 mt-4">
            <h1 class="text-2xl font-semibold mb-8">{selectedBoard()?.title}</h1>
            <Index each={taskGroups()}>{(taskGroup, _) => <TaskGroup taskGroup={taskGroup()} />}</Index>
            <TaskContextMenu />
        </div>
    );
}
