'use client';

import { useFavoritesStore } from '@/store/favoritesStore';
import { CountryCard } from '@/components/CountryCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <header className="flex justify-between items-center py-4 border-b border-slate-200 dark:border-slate-800">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        My Favorites
                    </h1>
                    <Link 
                        href="/"
                        className="text-sm font-semibold hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </header>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {favorites.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-20">
                        <h2 className="text-xl font-semibold mb-4">No favorites yet</h2>
                        <p className="text-gray-500 mb-8">Go back and add some countries to your list!</p>
                        <Link 
                            href="/"
                            className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Explore Countries
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}