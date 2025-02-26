import { Request, Response } from 'express';
import { getPokemonData } from '../services/pokemonServices';

export const getPokemonByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    console.log(`Obteniendo información del Pokémon ${name}`);

    try {
        const pokemonInfo = await getPokemonData(name);
        res.json(pokemonInfo);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Pokémon no encontrado') {
                res.status(404).json({ message: 'Pokémon no encontrado' });
            } else {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener el Pokémon' });
            }
        } else {
            console.error(error);
            res.status(500).json({ message: 'Error desconocido' });
        }
    }
};