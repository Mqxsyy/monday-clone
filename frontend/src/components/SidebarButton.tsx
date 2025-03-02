export default function SidebarButton(props: {
    text: string;
}) {
    return (
        <button class="btn btn-ghost text-md justify-start mb-1 px-2 p-0" type="button">
            {props.text}
        </button>
    );
}
