import { FaSolidAngleDown, FaSolidAngleUp } from "solid-icons/fa";
import { Index, Match, Show, Switch, createSignal } from "solid-js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import Task from "./Task.jsx";
import TaskGroupFooter from "./TaskGroupFooter.jsx";
import TaskGroupHeader from "./TaskGroupHeader.jsx";

export default function TaskGroup(props: { taskGroup: TaskGroupEntity }) {
    const [showTasks, setShowTasks] = createSignal(true);
    const toggleTasks = () => setShowTasks((prev) => !prev);

    return (
        <div>
            <div class="flex flex-row mb-2">
                <div class="mx-1 mt-1">
                    <Switch>
                        <Match when={showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleDown size={22} style={{ color: props.taskGroup.groupColor }} />
                            </button>
                        </Match>
                        <Match when={!showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleUp size={22} style={{ color: props.taskGroup.groupColor }} />
                            </button>
                        </Match>
                    </Switch>
                </div>
                <p class="text-lg font-semibold" style={{ color: props.taskGroup.groupColor }}>
                    {props.taskGroup.title}
                </p>
            </div>

            <Show when={showTasks()}>
                <div class="bg-base-200 mb-8 mr-2">
                    <TaskGroupHeader group={props.taskGroup} />
                    <Index each={props.taskGroup.tasks}>
                        {(task, _) => <Task task={task()} group={props.taskGroup} />}
                    </Index>
                    <TaskGroupFooter group={props.taskGroup} />
                </div>
            </Show>
        </div>
    );
}
