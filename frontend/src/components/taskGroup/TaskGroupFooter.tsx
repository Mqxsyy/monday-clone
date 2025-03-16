import { createSignal } from "solid-js";
import { ReloadTaskGroups } from "../../stores/taskGroupStore.js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";

export default function TaskGroupFooter(props: { group: TaskGroupEntity }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isHovering, setIsHovering] = createSignal<boolean>(false);
    const [isFocused, setIsFocused] = createSignal<boolean>(false);

    const [text, setText] = createSignal("");

    const createTask = async () => {
        if (text().trim() === "") return;

        fetch(`${backendUrl}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: text(),
                taskGroupId: props.group.id,
            }),
        }).then((res) => {
            if (res.ok) {
                ReloadTaskGroups();
            }
        });

        setText("");
    };

    return (
        <div class="flex flex-row">
            <div class="w-1.5 bg-neutral-200 rounded-bl-lg" style={{ "background-color": props.group.groupColor }} />
            <div class="flex flex-row w-full border-b">
                <div class="m-1 w-98 rounded-md border-1" classList={{ "border-transparent": !isHovering() }}>
                    <input
                        class="size-full outline-none rounded-md p-1 pl-2"
                        classList={{ "border-none": !isFocused() }}
                        type="text"
                        value={text()}
                        placeholder="+ Add item"
                        onInput={(e) => setText(e.currentTarget.value)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onFocusIn={() => setIsFocused(true)}
                        onFocusOut={() => {
                            setIsFocused(false);
                            createTask();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                createTask();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
