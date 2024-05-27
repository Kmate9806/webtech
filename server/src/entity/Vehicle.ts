import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleDTO } from '../../../models';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Vehicle implements VehicleDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: 'text' })
    brand: string;

    @Column({ nullable: true, type: 'text' })
    model: string;
    
    @Column({ nullable: true, type: 'text' })
    chassisNumber: string;

    @Column()
    odometer: number;

    @Column()
    basePrice: number;

    @Column()
    kmCost: number;

    @Column()
    imgUrl: string;

    @Column({ nullable: true, type: 'text' })
    status: string;

    @ManyToOne(() => User, (user) => user.vehicles, { eager: true })
    uploader: User;

    @ManyToMany(() => Category, { eager: true })
    @JoinTable()
    categories: Category[];
}