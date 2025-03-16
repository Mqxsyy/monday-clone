import { createSignal } from "solid-js";
import type { TaskEntity } from "../../../types/entities/TaskEntity.js";

export default function TitleField(props: { task: TaskEntity }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isHovering, setIsHovering] = createSignal<boolean>(false);
    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    const [title, setTitle] = createSignal(props.task.title);

    const updateTitle = async () => {
        fetch(`${backendUrl}/tasks/${props.task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title(),
            }),
        });
    };

    return (
        <div class="m-1 ml-5 w-94 border-1 rounded-md" classList={{ "border-transparent": !isHovering() }}>
            <input
                class="px-2 py-1 size-full outline-none rounded-md"
                classList={{ "border-none": !isFocused() }}
                type="text"
                value={title()}
                onInput={(e) => setTitle(e.currentTarget.value)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onFocusIn={() => setIsFocused(true)}
                onFocusOut={() => {
                    setIsFocused(false);
                    updateTitle();
                }}
            />
        </div>
    );
}
