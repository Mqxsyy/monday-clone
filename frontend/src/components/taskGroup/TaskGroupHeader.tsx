import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";
import TaskFieldDivider from "./TaskFieldDivider.jsx";
import TextFieldLabel from "./taskFields/TextFieldLabel.jsx";
import TitleFieldLabel from "./taskFields/TitleFieldLabel.jsx";

export default function TaskGroupHeader(props: { group: TaskGroupEntity }) {
    return (
        <div class="flex flex-row">
            <div class="w-1.5 bg-neutral-200 rounded-tl-lg" style={{ "background-color": props.group.groupColor }} />
            <div class="flex flex-row w-full border-y">
                <TitleFieldLabel />
                <TaskFieldDivider />

                <TextFieldLabel />
                <TaskFieldDivider />
            </div>
        </div>
    );
}
