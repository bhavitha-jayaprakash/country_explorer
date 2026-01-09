'use client';

import { Country } from '@/types';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useEffect, useState } from 'react';

export default function FavoriteButton({ country }: { country: Country }) {
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-12 h-12" />; 

    const isFav = isFavorite(country.cca3);

    return (
        <button
            onClick={() => toggleFavorite(country)}
            className="p-3 rounded-full shadow-md transition-all border group bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
            title={isFav ? "Remove from Favorites" : "Add to Favorites"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFav ? "red" : "none"}
                stroke={isFav ? "red" : "currentColor"}
                className={`w-6 h-6 transition-colors ${
                    isFav 
                    ? "text-red-500" 
                    : "text-slate-400 group-hover:text-red-500 dark:text-slate-400"
                }`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
    );
}