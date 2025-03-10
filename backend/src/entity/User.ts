import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Workspace } from "./Workspace";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    imagePath: string;

    @OneToMany(
        () => Workspace,
        (workspace) => workspace.owner,
    )
    ownedWorkspaces: Workspace[];
}
