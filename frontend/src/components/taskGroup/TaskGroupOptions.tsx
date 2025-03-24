import { BsThreeDots } from "solid-icons/bs";
import { Match, Switch, createSignal } from "solid-js";
import { ReloadTaskGroups } from "../../stores/taskGroupStore.js";

export default function TaskGroupOptions(props: { showButton: boolean; groupId: number }) {
    const [isdropdownFocused, setIsDropdownFocused] = createSignal<boolean>(false);
    const [isHoveringDropdown, setIsHoveringDropdown] = createSignal<boolean>(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const deleteGroup = () => {
        fetch(`${backendUrl}/taskGroups/${props.groupId}`, {
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
        <Switch>
            <Match when={props.showButton || isdropdownFocused()}>
                <div class="relative">
                    <button
                        type="button"
                        class="btn btn-ghost p-1 x-min h-min"
                        tabindex="0"
                        onFocusIn={() => setIsDropdownFocused(true)}
                        onFocusOut={() => setIsDropdownFocused(false)}
                    >
                        <BsThreeDots size={20} />
                    </button>

                    {(isdropdownFocused() || isHoveringDropdown()) && (
                        <div
                            class="absolute left-full top-0 flex flex-col w-max p-2 bg-base-200 rounded-md shadow-lg"
                            tabindex="0"
                            onMouseEnter={() => setIsHoveringDropdown(true)}
                            onMouseLeave={() => setIsHoveringDropdown(false)}
                        >
                            <button type="button" class="btn" onClick={deleteGroup} tabindex="0">
                                Delete group
                            </button>
                        </div>
                    )}
                </div>
            </Match>

            <Match when={!props.showButton && !isdropdownFocused()}>
                <div class="btn p-1 x-min h-min bg-transparent border-transparent">
                    <BsThreeDots size={20} color="transparent" />
                </div>
            </Match>
        </Switch>
    );
}
