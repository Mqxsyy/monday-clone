import type { Task as ITask } from "../types/Task.js";

export default function Task(props: {
    task: ITask;
}) {
    return <div>{props.task.title}</div>;
}
