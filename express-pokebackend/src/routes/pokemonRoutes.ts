import { Router } from 'express';
import { getPokemonByName } from '../controllers/pokemonController';

const pokemonRoutes = Router();

pokemonRoutes.get('/pokemon/:name', getPokemonByName);

export default pokemonRoutes;