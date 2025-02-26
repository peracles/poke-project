import PokemonCardProps from './PokemonCard.types';
import { useNavigate } from 'react-router-dom';
import TypeIcon from '../TypeIcon/TypeIcon';
import PokeballIcon from '../../assets/icons/Poke_Ball_icon.png';

const typeColors: { [key: string]: string } = {
    steel: 'var(--steel-color)',
    water: 'var(--water-color)',
    bug: 'var(--bug-color)',
    dragon: 'var(--dragon-color)',
    electric: 'var(--electric-color)',
    ghost: 'var(--ghost-color)',
    fire: 'var(--fire-color)',
    fairy: 'var(--fairy-color)',
    ice: 'var(--ice-color)',
    fighting: 'var(--fighting-color)',
    normal: 'var(--normal-color)',
    grass: 'var(--grass-color)',
    psychic: 'var(--psychic-color)',
    rock: 'var(--rock-color)',
    dark: 'var(--dark-color)',
    ground: 'var(--ground-color)',
    poison: 'var(--poison-color)',
    flying: 'var(--flying-color)',
};

const getBackgroundColor = (types: string[]): string => {
    if (types.length === 1) {
        return typeColors[types[0]] || '#FFFFFF';
    } else if (types.length === 2) {
        const color1 = typeColors[types[0]] || '#FFFFFF';
        const color2 = typeColors[types[1]] || '#FFFFFF';
        return `linear-gradient(45deg, ${color1}, ${color2})`;
    }
    return '#FFFFFF';
};

const getTextColor = (backgroundColor: string): string => {
    if (backgroundColor.includes('gradient')) {
        return '#FFFFFF';
    }
    const color = backgroundColor.replace('var(', '').replace(')', '');
    const isLight = ['#FFFFFF', '#FAC000', '#3DD9FF', '#81B9EF'].includes(color);
    return isLight ? '#000000' : '#FFFFFF';
};

const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str; // Si la cadena está vacía, devolverla tal cual
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatDamageRelations = (relations: string[] | undefined, label: string): React.ReactNode | null => {
    if (!relations || relations.length === 0) return null; // Si no hay relaciones, no mostrar nada

    return (
        <div className="flex items-center space-x-2">
            <span>{label} </span>
            <div className="flex space-x-1">
                {relations.map((type) => (
                    <TypeIcon key={type} type={type} />
                ))}
            </div>
        </div>
    );
};

const PokemonCard = (props: PokemonCardProps) => {
    const pokemon = { ...props };
    const navigate = useNavigate();

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    const backgroundColor = getBackgroundColor(pokemon.types);
    const textColor = getTextColor(backgroundColor);

    return (
        <div className='flex flex-col justify-center items-end'>
            {/* <div className="bg-gray-100 p-6 rounded-lg shadow-lg border-8 border-gray-400 min-w-[25rem] min-h-[40rem]"> */}
            <div
                className="p-6 rounded-lg shadow-lg border-8 border-gray-400 min-w-[25rem] min-h-[40rem]"
                style={{
                    background: backgroundColor,
                    color: textColor,
                }}
            >
                <div className='flex justify-start mb-1 pl-[2rem] items-center'>
                    <img src={PokeballIcon}
                        alt="Pokeball"
                        className="w-6 h-6 inline-block" // Ajusta el tamaño según necesites
                        title="Pokeball"
                    />
                    <h2 className="text-2xl font-bold pl-[.5rem]">{pokemon.name.toUpperCase()}</h2>
                </div>
                
                <div>
                    <div className="p-5 bg-white">
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />
                    </div>
                    <div className="flex justify-between items-center bg-gray-400 px-5 py-1 rounded">
                        <p><span>Weight:</span> {pokemon.weight}</p>
                        <p><span>Height:</span> {pokemon.height}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Tipos</h3>
                    <div className="flex space-x-2">
                        {pokemon.types.map((type) => (
                            <div key={type} className="flex items-center space-x-1">
                                <TypeIcon type={type} />
                                <span>{capitalizeFirstLetter(type)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Movimientos</h3>
                    <p>{pokemon.moves.slice(0, 5).join(', ')}...</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Estadísticas</h3>
                    <ul>
                        {pokemon.stats.map((stat, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{capitalizeFirstLetter(stat.stat_name)}</span>
                                <p>{stat.base_stat}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                {pokemon.damage_relations && ( // Verificar si damage_relations existe
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Relaciones de Daño</h3>
                        <div className="flex flex-col mt-[.5rem]">
                            {[
                                formatDamageRelations(pokemon.damage_relations.double_damage_from, 'Debil x2: '),
                                formatDamageRelations(pokemon.damage_relations.double_damage_to, 'Daño x2: '),
                                formatDamageRelations(pokemon.damage_relations.half_damage_from, 'Debil x1/2: '),
                                formatDamageRelations(pokemon.damage_relations.half_damage_to, 'Daño x1/2: '),
                                formatDamageRelations(pokemon.damage_relations.no_damage_from, 'Debil x0: '),
                                formatDamageRelations(pokemon.damage_relations.no_damage_to, 'Daño x0: '),
                            ].filter(Boolean)}
                        </div>
                    </div>
                )}
            </div>
            <div className='pt-3'>
                <button className="p-2 bg-blue-500 text-white rounded" onClick={handleClick}>
                    Regresar
                </button>
            </div>
        </div>
        
    )
}

export default PokemonCard;
