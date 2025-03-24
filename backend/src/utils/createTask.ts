import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { TaskFieldValue } from "../entity/TaskFieldValue";
import { TaskGroup } from "../entity/TaskGroup";
import { TaskFieldType } from "../types/TaskFieldType";

export default async function CreateTask(title: string, taskGroupId: number) {
    const taskGroup = await AppDataSource.manager.findOne(TaskGroup, {
        where: {
            id: Number(taskGroupId),
        },
        relations: ["tasks", "board", "board.taskFields"],
    });

    if (!taskGroup) return;

    const task = new Task();
    task.title = title;
    task.taskOrder = taskGroup.tasks.length + 1;
    task.taskGroup = taskGroup;

    const taskFields: TaskFieldValue[] = [];

    for (const taskField of taskGroup.board.taskFields) {
        const fieldType = taskField.value.type;
        if (fieldType === TaskFieldType.TextField) {
            const textField = new TaskFieldValue();
            textField.value = {
                type: TaskFieldType.TextField,
                value: "",
            };
            textField.task = task;
            taskFields.push(textField);
        }
    }

    await AppDataSource.manager.save([task, ...taskFields]);

    return task;
}
