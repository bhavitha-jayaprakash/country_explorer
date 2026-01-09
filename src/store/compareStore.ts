import { create } from 'zustand';
import { Country } from '@/types';

interface CompareState {
    selectedCountries: Country[];
    toggleCountry: (country: Country) => void;
    clearSelection: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
    selectedCountries: [],
    toggleCountry: (country) =>
        set((state) => {
            const exists = state.selectedCountries.find((c) => c.cca3 === country.cca3);
            if (exists) {
                return { selectedCountries: state.selectedCountries.filter((c) => c.cca3 !== country.cca3) };
            }
            if (state.selectedCountries.length >= 2) {
                return { selectedCountries: [state.selectedCountries[1], country] };
            }
            return { selectedCountries: [...state.selectedCountries, country] };
        }),
    clearSelection: () => set({ selectedCountries: [] }),
}));