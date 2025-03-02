import type { ParentProps } from "solid-js";

export default function Dashboard(props: ParentProps) {
    return <div class="bg-base-100 grow h-full rounded-tl-lg ">{props.children}</div>;
}
