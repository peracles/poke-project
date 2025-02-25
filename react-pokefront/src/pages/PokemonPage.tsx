import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import Pokemon from '../components/PokemonCard/PokemonCard.types';

const PokemonPage = () => {
    const { pokename } = useParams<{ pokename: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/pokeapi/pokemon/${pokename}`);
                const data = response.data;

                setPokemon({
                    ...data,
                });
                setLoading(false);
            } catch {
                setError('Pokémon no encontrado');
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pokename]);

    if (loading) return <div>Cargando...</div>;
    if (error) return ( 
    <div className='flex flex-col justify-center items-center'>
        <div>{error}</div>
        <div className='pt-3'>
            <button className="p-2 bg-blue-500 text-white rounded" onClick={handleClick}>
                Regresar
            </button>
        </div>
    </div>);

    return (
        <div className="p-4">
            {pokemon && <PokemonCard {...pokemon} />}
        </div>
    );
};

export default PokemonPage;