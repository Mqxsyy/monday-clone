import { AppDataSource } from "../data-source";
import { Board } from "../entity/Board";
import { TaskGroup } from "../entity/TaskGroup";
import GetRandomGroupColor from "./getRandomGroupColor";

export default async function CreateTaskGroup(title: string, boardId: number) {
    const board = await AppDataSource.manager.findOneBy(Board, {
        id: Number(boardId),
    });

    if (!board) return;

    const taskGroup = new TaskGroup();
    taskGroup.title = title;
    taskGroup.groupColor = GetRandomGroupColor();
    taskGroup.board = board;

    const existingGroupAmount = await AppDataSource.manager.count(TaskGroup, {
        where: { board: board },
    });
    taskGroup.groupOrder = existingGroupAmount + 1;

    await AppDataSource.manager.save(taskGroup);

    return taskGroup;
}
