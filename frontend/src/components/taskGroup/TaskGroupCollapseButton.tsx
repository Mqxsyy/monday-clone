import { FaSolidAngleDown, FaSolidAngleUp } from "solid-icons/fa";
import { Match, Switch } from "solid-js";

export default function TaskGroupCollapseButton(props: {
    isCollapsed: boolean;
    onClick: () => void;
    groupColor: string;
}) {
    return (
        <div class="ml-3 mt-2">
            <Switch>
                <Match when={props.isCollapsed}>
                    <button type="button" onClick={props.onClick}>
                        <FaSolidAngleDown size={18} style={{ color: props.groupColor }} />
                    </button>
                </Match>

                <Match when={!props.isCollapsed}>
                    <button type="button" onClick={props.onClick}>
                        <FaSolidAngleUp size={18} style={{ color: props.groupColor }} />
                    </button>
                </Match>
            </Switch>
        </div>
    );
}
