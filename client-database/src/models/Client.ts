import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    id_community: number;

    @Column("varchar",{
        length: 50
    })
    clientName: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    id_producer: string | null;

}
