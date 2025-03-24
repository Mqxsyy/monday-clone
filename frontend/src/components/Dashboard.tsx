import type { ParentProps } from "solid-js";

export default function Dashboard(props: ParentProps) {
    return <div class="flex flex-col flex-1 bg-base-100 rounded-tl-lg">{props.children}</div>;
}
