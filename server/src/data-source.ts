import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Vehicle } from "./entity/Vehicle"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "rental",
    synchronize: true,
    logging: true,
    entities: [User, Vehicle, Category],
    migrations: [],
    subscribers: [],
})
