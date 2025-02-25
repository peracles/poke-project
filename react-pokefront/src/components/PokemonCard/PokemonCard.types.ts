interface DamageRelations {
    double_damage_from: string[];
    double_damage_to: string[];
    half_damage_from: string[];
    half_damage_to: string[];
    no_damage_from: string[];
    no_damage_to: string[];
}

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    stats: {
        base_stat: number;
        stat_name: string;
    }[];
    types: string[];
    moves: string[];
    height: number;
    weight: number;
    abilities: string[];
    base_experience: number;
    damage_relations: DamageRelations;
}

export default Pokemon;