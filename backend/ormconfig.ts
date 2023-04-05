import 'dotenv/config'

import {DataSource} from "typeorm";

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  migrations: [
    String(process.env.DATABASE_MIGRATIONS)
  ],
  entities: [
    String(process.env.DATABASE_ENTITIES)
  ],
})

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization", err)
})
