import {Entity, PrimaryGeneratedColumn, Column, Timestamp} from "typeorm";

@Entity()
export class Iot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sensorid: number;

    @Column()
    Time: Date;

    @Column()
    Value: number;

}
