import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Country } from '@/types';

interface FavoritesState {
    favorites: Country[];
    toggleFavorite: (country: Country) => void;
    isFavorite: (cca3: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (country) => {
                const { favorites } = get();
                const exists = favorites.find((c) => c.cca3 === country.cca3);

                if (exists) {
                    set({ favorites: favorites.filter((c) => c.cca3 !== country.cca3) });
                } else {
                    set({ favorites: [...favorites, country] });
                }
            },
            isFavorite: (cca3) => {
                return get().favorites.some((c) => c.cca3 === cca3);
            },
        }),
        {
            name: 'favorites-storage',
        }
    )
);