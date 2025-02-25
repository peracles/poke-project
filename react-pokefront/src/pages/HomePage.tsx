import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

export default function HomePage() {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        navigate(`/pokemon/${query}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-amber-50">Buscador de Pokémon</h1>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}
