import { BsThreeDots } from "solid-icons/bs";
import { FaSolidAngleDown, FaSolidAngleUp } from "solid-icons/fa";
import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { ReloadTaskGroups } from "../../stores/taskGroupStore.js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import Task from "./Task.jsx";
import TaskGroupFooter from "./TaskGroupFooter.jsx";
import TaskGroupHeader from "./TaskGroupHeader.jsx";

export default function TaskGroup(props: { taskGroup: TaskGroupEntity }) {
    const [isHoveringHeading, setIsHoveringHeading] = createSignal<boolean>(false);
    const [isSettingFocused, setIsSettingsFocused] = createSignal<boolean>(false);

    const [isHoveringTitle, setIsHoveringTitle] = createSignal<boolean>(false);
    const [isFocusedTitle, setIsFocusedTitle] = createSignal<boolean>(false);

    const [title, setTitle] = createSignal(props.taskGroup.title);

    const [showTasks, setShowTasks] = createSignal(true);
    const toggleTasks = () => setShowTasks((prev) => !prev);

    const [spanWidth, setSpanWidth] = createSignal(0);
    let spanRef!: HTMLSpanElement;

    createEffect(() => {
        title();
        setSpanWidth(spanRef.offsetWidth);
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const updateTitle = () => {
        fetch(`${backendUrl}/taskGroups/${props.taskGroup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title(),
            }),
        });
    };

    const deleteGroup = () => {
        fetch(`${backendUrl}/taskGroups/${props.taskGroup.id}`, {
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

    return (
        <div>
            <div
                class="flex flex-row mb-2 items-center"
                onMouseEnter={() => setIsHoveringHeading(true)}
                onMouseLeave={() => setIsHoveringHeading(false)}
            >
                <Switch>
                    <Match when={isHoveringHeading() || isSettingFocused()}>
                        <div class="relative">
                            <button
                                type="button"
                                class="btn btn-ghost p-1 x-min h-min"
                                onFocusIn={() => setIsSettingsFocused(true)}
                                onFocusOut={() => {
                                    setTimeout(() => setIsSettingsFocused(false), 100);
                                }}
                            >
                                <BsThreeDots size={20} />
                            </button>
                            {isSettingFocused() && (
                                <div class="absolute left-full top-0 flex flex-col w-max p-2 bg-base-200 rounded-md shadow-lg">
                                    <button type="button" class="btn" onClick={deleteGroup}>
                                        Delete group
                                    </button>
                                </div>
                            )}
                        </div>
                    </Match>
                    <Match when={!isHoveringHeading() && !isSettingFocused()}>
                        <div class="btn p-1 x-min h-min bg-transparent border-transparent">
                            <BsThreeDots size={20} color="transparent" />
                        </div>
                    </Match>
                </Switch>
                <div class="ml-3 mt-2">
                    <Switch>
                        <Match when={showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleDown size={18} style={{ color: props.taskGroup.groupColor }} />
                            </button>
                        </Match>
                        <Match when={!showTasks()}>
                            <button type="button" onClick={toggleTasks}>
                                <FaSolidAngleUp size={18} style={{ color: props.taskGroup.groupColor }} />
                            </button>
                        </Match>
                    </Switch>
                </div>
                <div
                    class="m-1 rounded-md border-1"
                    classList={{ "border-transparent": !isHoveringTitle() }}
                    style={{ color: props.taskGroup.groupColor }}
                >
                    <span
                        ref={spanRef}
                        class="absolute px-1 opacity-0 text-lg font-semibold whitespace-pre pointer-events-none"
                    >
                        {title()}
                    </span>
                    <input
                        class="pl-1 outline-none rounded-md text-lg font-semibold"
                        classList={{ "border-transparent": !isFocusedTitle() }}
                        style={{
                            color: props.taskGroup.groupColor,
                            width: `${spanWidth()}px`,
                        }}
                        type="text"
                        value={title()}
                        onInput={(e) => setTitle(e.currentTarget.value)}
                        onMouseEnter={() => setIsHoveringTitle(true)}
                        onMouseLeave={() => setIsHoveringTitle(false)}
                        onFocusIn={() => setIsFocusedTitle(true)}
                        onFocusOut={() => {
                            setIsFocusedTitle(false);
                            updateTitle();
                        }}
                    />
                </div>
            </div>

            <Show when={showTasks()}>
                <div class="bg-base-200 ml-9 mb-8 mr-2">
                    <TaskGroupHeader group={props.taskGroup} />
                    <For each={props.taskGroup.tasks}>{(task, _) => <Task task={task} group={props.taskGroup} />}</For>
                    <TaskGroupFooter group={props.taskGroup} />
                </div>
            </Show>
        </div>
    );
}
