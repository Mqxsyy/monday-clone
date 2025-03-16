import { createSignal } from "solid-js";
import type { TaskFieldValueEntity } from "../../../types/entities/TaskFieldValueEntity.js";

export default function TextField(props: { taskField: TaskFieldValueEntity, groupId: number }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isHovering, setIsHovering] = createSignal<boolean>(false);
    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    const [text, setText] = createSignal(props.taskField.value.value);

    const updateValue = async () => {
        fetch(`${backendUrl}/taskField/${props.taskField.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                value: text(),
            }),
        });
    };

    return (
        <div class="m-1 w-25 rounded-md" classList={{ "border-1": isHovering() }}>
            <input
                class="size-full outline-none rounded-md text-center"
                classList={{ "border-none": !isFocused() }}
                type="text"
                value={text()}
                onInput={(e) => setText(e.currentTarget.value)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onFocusIn={() => setIsFocused(true)}
                onFocusOut={() => {
                    setIsFocused(false);
                    updateValue();
                }}
            />
        </div>
    );
}
