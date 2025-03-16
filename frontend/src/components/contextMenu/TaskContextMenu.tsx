import { createSignal, onCleanup } from "solid-js";
import { ReloadTaskGroups } from "../../stores/taskGroupStore.js";

const [taskId, setTaskId] = createSignal<number | undefined>();
const [position, setPosition] = createSignal({ x: 0, y: 0 });

export const OpenTaskContextMenu = (taskId: number, position: { x: number; y: number }) => {
    setTaskId(taskId);
    setPosition(position);
};

const closeTaskContextMenu = () => setTaskId(undefined);

export default function TaskContextMenu() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const deleteTask = () => {
        if (!taskId()) {
            return;
        }

        fetch(`${backendUrl}/tasks/${taskId()}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                ReloadTaskGroups();
            }
        });
    };

    document.addEventListener("click", closeTaskContextMenu);
    onCleanup(() => document.removeEventListener("click", closeTaskContextMenu));

    return (
        <>
            {taskId() && (
                <div
                    class="absolute bg-base-200 rounded-xl shadow-[0_0px_10px_rgba(0,0,0,0.6)] p-2 z-50"
                    style={{ top: `${position().y}px`, left: `${position().x}px` }}
                >
                    <button class="btn btn-ghost" type="button" onClick={deleteTask}>
                        Delete
                    </button>
                </div>
            )}
        </>
    );
}
