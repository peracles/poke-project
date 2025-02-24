import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pokeapi', pokemonRoutes);

export default app;