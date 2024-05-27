import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { UserDTO } from "../../../models"
import { Vehicle } from "./Vehicle";

@Entity()
export class User implements UserDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    address: string

    @Column()
    tel: number

    @Column()
    email: string
    
    @OneToMany(() => Vehicle, vehicle => vehicle.uploader)
    vehicles: Vehicle[];
}
