import { createEffect, createSignal } from "solid-js";
import type { TaskGroupEntity } from "../../types/entities/TaskGroupEntity.js";

export default function TaskGroupTitle(props: { taskGroup: TaskGroupEntity }) {
    const [isHoveringTitle, setIsHoveringTitle] = createSignal<boolean>(false);
    const [isFocusedTitle, setIsFocusedTitle] = createSignal<boolean>(false);

    const [spanWidth, setSpanWidth] = createSignal(0);
    let spanRef!: HTMLSpanElement;

    const [title, setTitle] = createSignal(props.taskGroup.title);

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

    return (
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
    );
}
