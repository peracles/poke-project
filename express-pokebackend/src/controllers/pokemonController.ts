import { Request, Response, NextFunction} from 'express';
import axios from 'axios';
import Historial from '../models/historial';

export const getPokemonByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    console.log(`Obteniendo información del Pokémon ${name}`);
    try {
        const historial = await Historial.findOne({ where: { name: name } });
    
        if (historial) {
          console.log('Obteniendo informacion de BD');
          res.json(historial.information);
        } else {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const pokemonInfo = response.data;
          await Historial.create({
            name: name,
            information: pokemonInfo,
          });
          console.log('Obteniendo informacion de api');
          res.json(pokemonInfo);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // Pokémon no encontrado
            res.status(404).json({ message: 'Pokémon no encontrado' });
          } else {
            // Otro tipo de error
            res.status(500).json({ message: 'Error al obtener el Pokémon' });
          }
    }
};