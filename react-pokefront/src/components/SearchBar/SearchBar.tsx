import React, { useState } from 'react';
import SearchBarProps from './SearchBar.types';

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query?.toLowerCase());
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
                type="text"
                placeholder="Buscar Pokémon por nombre"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border rounded flex-grow text-amber-50 bg-gradient-to-r from-sky-500 to-indigo-600 border-amber-50"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;