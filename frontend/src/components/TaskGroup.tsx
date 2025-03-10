import { FaSolidAngleDown, FaSolidAngleUp } from "solid-icons/fa";
import { Index, Match, Show, Switch, createSignal } from "solid-js";
import type { TaskGroup as ITaskGroup } from "../types/TaksGroup.js";
import Task from "./Task.jsx";

export default function TaskGroup(props: {
    taskGroup: ITaskGroup;
}) {
    const [showTasks, setShowTasks] = createSignal(true);
    const toggleTasks = () => setShowTasks((prev) => !prev);

    return (
        <div>
            <div class="flex flex-row mb-2">
                <div class="mx-1 mt-1">
                    <Switch>
                        <Match when={showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleDown size={22} />
                            </button>
                        </Match>
                        <Match when={!showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleUp size={22} />
                            </button>
                        </Match>
                    </Switch>
                </div>
                <p class="text-lg font-semibold">{props.taskGroup.title}</p>
            </div>
            <Show when={showTasks()}>
                <div class="bg-base-200 rounded-lg px-4 py-2 mb-8">
                    <Index each={props.taskGroup.tasks}>{(task, _) => <Task task={task()} />}</Index>
                </div>
            </Show>
        </div>
    );
}
