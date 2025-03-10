import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./Board";
import { User } from "./User";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    imagePath?: string;

    @OneToMany(
        () => Board,
        (board) => board.workspace,
    )
    boards: Board[];

    @ManyToOne(
        () => User,
        (user) => user.ownedWorkspaces,
    )
    owner: User;

    @ManyToMany(() => User)
    @JoinTable()
    collaborators: User[];
}
