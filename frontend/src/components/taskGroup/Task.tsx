import { Index, createSignal } from "solid-js";
import type { TaskEntity } from "../../types/entities/TaskEntity.js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import { GetTaskFieldComponent } from "../../utils/getTaskFieldComponent.js";
import { OpenTaskContextMenu } from "../contextMenu/TaskContextMenu.jsx";
import TaskFieldDivider from "./TaskFieldDivider.jsx";
import TitleField from "./taskFields/TitleField.jsx";

export default function Task(props: { task: TaskEntity; group: TaskGroupEntity }) {
    const [isHovering, setIsHovering] = createSignal(false);

    return (
        <div
            class="relative"
            onContextMenu={(e) => {
                e.preventDefault();
                OpenTaskContextMenu(props.task.id, { x: e.clientX, y: e.clientY });
            }}
        >
            {isHovering() && (
                <div class="absolute w-full h-full bg-black opacity-10 shadow-lg shadow-white pointer-events-none " />
            )}

            <div
                class="flex flex-row"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div class="w-1.5" style={{ "background-color": props.group.groupColor }} />
                <div class="flex flex-row w-full border-b">
                    <TitleField task={props.task} />
                    <TaskFieldDivider />

                    <Index each={props.task.taskFieldValues}>
                        {(taskFieldValue) => (
                            <div class="flex flex-row">
                                {GetTaskFieldComponent(taskFieldValue().value.type).field({
                                    taskField: taskFieldValue(),
                                    groupId: props.group.id,
                                })}
                                <TaskFieldDivider />
                            </div>
                        )}
                    </Index>
                </div>
            </div>
        </div>
    );
}
