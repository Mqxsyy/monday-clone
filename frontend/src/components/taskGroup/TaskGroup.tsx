import { For, Show, createSignal } from "solid-js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import Task from "./Task.jsx";
import TaskGroupCollapseButton from "./TaskGroupCollapseButton.jsx";
import TaskGroupFooter from "./TaskGroupFooter.jsx";
import TaskGroupHeader from "./TaskGroupHeader.jsx";
import TaskGroupOptions from "./TaskGroupOptions.jsx";
import TaskGroupTitle from "./TaskGroupTitle.jsx";

export default function TaskGroup(props: { taskGroup: TaskGroupEntity }) {
    const [isHoveringHeading, setIsHoveringHeading] = createSignal<boolean>(false);

    const [isCollapsed, setIsCollapsed] = createSignal(true);
    const toggleCollapse = () => setIsCollapsed((prev) => !prev);

    return (
        <div>
            <div
                class="flex flex-row mb-2 items-center"
                onMouseEnter={() => setIsHoveringHeading(true)}
                onMouseLeave={() => setIsHoveringHeading(false)}
            >
                <TaskGroupOptions showButton={isHoveringHeading()} groupId={props.taskGroup.id} />
                <TaskGroupCollapseButton
                    isCollapsed={isCollapsed()}
                    groupColor={props.taskGroup.groupColor}
                    onClick={toggleCollapse}
                />
                <TaskGroupTitle taskGroup={props.taskGroup} />
            </div>

            <Show when={isCollapsed()}>
                <div class="bg-base-200 ml-9 mb-8 mr-2">
                    <TaskGroupHeader group={props.taskGroup} />
                    <For each={props.taskGroup.tasks}>{(task, _) => <Task task={task} group={props.taskGroup} />}</For>
                    <TaskGroupFooter group={props.taskGroup} />
                </div>
            </Show>
        </div>
    );
}
