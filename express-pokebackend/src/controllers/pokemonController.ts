import { Request, Response } from 'express';
import axios from 'axios';
import Historial from '../models/historial';

export const getPokemonByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    console.log(`Obteniendo información del Pokémon ${name}`);

    try {
        // Buscar en la base de datos
        const historial = await Historial.findOne({ where: { name: name } });

        if (historial) {
            console.log('Obteniendo información de BD');
            res.json(historial.information);
        } else {
            // Hacer la solicitud a la primera API (Pokémon)
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonInfo = pokemonResponse.data;

            if (pokemonInfo) {
                // Extraer el tipo principal del Pokémon
                const primaryType = pokemonInfo.types[0].type.name;

                // Hacer la solicitud a la segunda API (Tipo)
                const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${primaryType}`);
                const typeInfo = typeResponse.data;

                // Filtrar la información del Pokémon
                const filteredPokeInfo = {
                    name: pokemonInfo.name,
                    height: pokemonInfo.height,
                    weight: pokemonInfo.weight,
                    base_experience: pokemonInfo.base_experience,
                    abilities: pokemonInfo.abilities.map((ability: any) => ability.ability.name),
                    types: pokemonInfo.types.map((type: any) => type.type.name),
                    sprites: {
                        front_default: pokemonInfo.sprites.front_default,
                        back_default: pokemonInfo.sprites.back_default,
                    },
                    stats: pokemonInfo.stats.map((stat: any) => ({
                        base_stat: stat.base_stat,
                        stat_name: stat.stat.name,
                    })),
                    moves: pokemonInfo.moves.map((move: any) => move.move.name),
                    damage_relations: {
                        double_damage_from: typeInfo.damage_relations.double_damage_from.map((dmg: any) => dmg.name),
                        double_damage_to: typeInfo.damage_relations.double_damage_to.map((dmg: any) => dmg.name),
                        half_damage_from: typeInfo.damage_relations.half_damage_from.map((dmg: any) => dmg.name),
                        half_damage_to: typeInfo.damage_relations.half_damage_to.map((dmg: any) => dmg.name),
                        no_damage_from: typeInfo.damage_relations.no_damage_from.map((dmg: any) => dmg.name),
                        no_damage_to: typeInfo.damage_relations.no_damage_to.map((dmg: any) => dmg.name),
                    },
                };

                // Guardar la información en la base de datos
                await Historial.create({
                    name: name,
                    information: filteredPokeInfo,
                });

                console.log('Obteniendo información de la API y filtrando');
                res.json(filteredPokeInfo);
            } else {
                throw new Error('Pokémon no encontrado');
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // Pokémon no encontrado
            res.status(404).json({ message: 'Pokémon no encontrado' });
        } else {
            // Otro tipo de error
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el Pokémon' });
        }
    }
};