import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DB as string || '',
    process.env.POSTGRES_USER as string || '',
    process.env.POSTGRES_PASSWORD as string || '',
    {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT as string),
        dialect: "postgres",
        logging: false,
    });

// console.log(`db: ${process.env.POSTGRES_DB} \n
//     user: ${process.env.POSTGRES_USER} \n
//     pass: ${process.env.POSTGRES_PASSWORD} \n
//     host: ${process.env.POSTGRES_HOST} \n
//     port: ${process.env.POSTGRES_PORT}`);

export default sequelize;