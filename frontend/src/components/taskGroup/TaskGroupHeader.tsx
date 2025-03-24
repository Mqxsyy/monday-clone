import { For } from "solid-js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import TaskFieldDivider from "./TaskFieldDivider.jsx";
import TitleFieldLabel from "./taskFields/TitleFieldLabel.jsx";
import { selectedBoard } from "../../stores/boardStore.js";
import type { BoardEntity } from "../../types/entities/BoardEntity.js";
import { GetTaskFieldComponent } from "../../utils/getTaskFieldComponent.js";

export default function TaskGroupHeader(props: { group: TaskGroupEntity }) {
    return (
        <div class="flex flex-row">
            <div class="w-1.5 bg-neutral-200 rounded-tl-lg" style={{ "background-color": props.group.groupColor }} />
            <div class="flex flex-row w-full border-y">
                <TitleFieldLabel />
                <TaskFieldDivider />

                <For each={(selectedBoard() as BoardEntity).taskFields}>
                    {(taskField) => {
                        return (
                            <>
                                {GetTaskFieldComponent(taskField.value.type).label()}
                                <TaskFieldDivider />
                            </>
                        );
                    }}
                </For>
            </div>
        </div>
    );
}
