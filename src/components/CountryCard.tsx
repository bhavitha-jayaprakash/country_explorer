'use client';

import Link from 'next/link';
import { Country } from '@/types';
import { motion } from 'framer-motion';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCompareStore } from '@/store/compareStore';
import { MouseEvent, useEffect, useState } from 'react';

interface CountryCardProps {
    country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const { selectedCountries, toggleCountry } = useCompareStore();
    
    // HYDRATION FIX: State to track if component is mounted
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isFav = mounted ? isFavorite(country.cca3) : false; // Only check favorite after mount
    const isSelected = selectedCountries.some(c => c.cca3 === country.cca3);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(country);
    };

    const handleCompareClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleCountry(country);
    };

    return (
        <div className="relative group">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={handleCompareClick}
                    className={`p-2 rounded-full shadow-sm transition-colors ${
                        isSelected 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white/80 dark:bg-black/50 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-black'
                    }`}
                    title="Compare"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                </button>

                <button
                    onClick={handleFavoriteClick}
                    className="p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
                    title="Favorite"
                >
                    {/* HYDRATION FIX: Only render the specific colors after mounting */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFav ? "red" : "none"}
                        stroke={isFav ? "red" : "currentColor"}
                        className={`w-6 h-6 transition-colors ${isFav ? "text-red-500" : "text-gray-600 dark:text-gray-300"}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            <Link href={`/country/${country.cca3}`}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl border h-full ${
                        isSelected 
                        ? 'bg-green-900 border-green-900 dark:bg-green-900 dark:border-green-700' 
                        : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                >
                    <div className="h-40 w-full relative">
                        <img
                            src={country.flags.svg}
                            alt={country.name.common}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6">
                        <h2 className={`text-lg font-extrabold mb-4 ${
                            isSelected 
                            ? 'text-white' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                            {country.name.common}
                        </h2>
                        <div className="space-y-1 text-sm">
                            <p className={`${
                                isSelected 
                                ? 'text-green-100' 
                                : 'text-slate-700 dark:text-slate-300'
                            }`}>
                                <span className={`font-semibold ${
                                    isSelected 
                                    ? 'text-white' 
                                    : 'text-slate-900 dark:text-white'
                                }`}>Population:</span>{' '}
                                {country.population.toLocaleString()}
                            </p>
                            <p className={`${
                                isSelected 
                                ? 'text-green-100' 
                                : 'text-slate-700 dark:text-slate-300'
                            }`}>
                                <span className={`font-semibold ${
                                    isSelected 
                                    ? 'text-white' 
                                    : 'text-slate-900 dark:text-white'
                                }`}>Region:</span>{' '}
                                {country.region}
                            </p>
                            <p className={`${
                                isSelected 
                                ? 'text-green-100' 
                                : 'text-slate-700 dark:text-slate-300'
                            }`}>
                                <span className={`font-semibold ${
                                    isSelected 
                                    ? 'text-white' 
                                    : 'text-slate-900 dark:text-white'
                                }`}>Capital:</span>{' '}
                                {country.capital?.[0] || 'N/A'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}