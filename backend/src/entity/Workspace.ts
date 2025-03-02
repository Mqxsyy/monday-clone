import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(
        () => Board,
        (board) => board.workspace,
    )
    boards: Board[];
}
