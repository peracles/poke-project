import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true }); //false para no reconstruir la base de datos
        console.log('All models were synchronized successfully.');

        app.listen(PORT);
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
};

main();