import axios from 'axios';
import Historial from '../models/historial';

export const getPokemonData = async (name: string) => {
    // Buscar en la base de datos
    const historial = await Historial.findOne({ where: { name: name } });

    if (historial) {
        console.log('Obteniendo información de BD');
        return historial.information;
    } else {
        // Hacer la solicitud a la primera API (Pokémon)
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonInfo = pokemonResponse.data;

        if (pokemonInfo) {
            // Verificar si el Pokémon tiene un solo tipo
            const hasSingleType = pokemonInfo.types.length === 1;

            // Inicializar el objeto de relaciones de daño
            let damageRelations = {};

            if (hasSingleType) {
                // Extraer el tipo principal del Pokémon
                const primaryType = pokemonInfo.types[0].type.name;

                // Hacer la solicitud a la segunda API (Tipo)
                const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${primaryType}`);
                const typeInfo = typeResponse.data;

                // Filtrar las relaciones de daño
                damageRelations = {
                    double_damage_from: typeInfo.damage_relations.double_damage_from.map((dmg: any) => dmg.name),
                    double_damage_to: typeInfo.damage_relations.double_damage_to.map((dmg: any) => dmg.name),
                    half_damage_from: typeInfo.damage_relations.half_damage_from.map((dmg: any) => dmg.name),
                    half_damage_to: typeInfo.damage_relations.half_damage_to.map((dmg: any) => dmg.name),
                    no_damage_from: typeInfo.damage_relations.no_damage_from.map((dmg: any) => dmg.name),
                    no_damage_to: typeInfo.damage_relations.no_damage_to.map((dmg: any) => dmg.name),
                };
            }

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
                damage_relations: hasSingleType ? damageRelations : undefined, // Solo añadir si tiene un solo tipo
            };

            // Guardar la información en la base de datos
            await Historial.create({
                name: name,
                information: filteredPokeInfo,
            });

            console.log('Obteniendo información de la API y filtrando');
            return filteredPokeInfo;
        } else {
            throw new Error('Pokémon no encontrado');
        }
    }
};