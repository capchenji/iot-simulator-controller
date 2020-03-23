import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class DeviceStatus {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sensorid: number;

    @Column()
    devicestatus: Boolean;

}
