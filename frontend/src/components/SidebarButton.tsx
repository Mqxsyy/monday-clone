import { A } from "@solidjs/router";

export default function SidebarButton(props: {
    text: string;
    path: string;
    onClick?: () => void;
}) {
    return (
        <A href={props.path} class="btn btn-ghost text-md justify-start mb-1 px-2 p-0" onClick={props.onClick}>
            {props.text}
        </A>
    );
}
