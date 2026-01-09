'use client';

import { useState } from 'react';
import { Country } from '@/types';
import { CountryCard } from '@/components/CountryCard';

interface CountryListProps {
    initialCountries: Country[];
}

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function CountryList({ initialCountries }: CountryListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const filteredCountries = initialCountries.filter((country) => {
        const matchesSearch = country.name.common 
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
            
        const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    suppressHydrationWarning
                    className="w-full md:w-1/3 p-3 rounded-md shadow-sm border outline-none transition-colors !bg-white !text-black border-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-300 dark:!bg-slate-800 dark:!text-white dark:border-slate-700 dark:focus:ring-slate-600 dark:placeholder:text-slate-400"
                />
                
                <div className="relative">
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        suppressHydrationWarning
                        className="p-3 pr-10 rounded-md shadow-sm border outline-none cursor-pointer transition-colors appearance-none !bg-white !text-black border-slate-200 focus:ring-2 focus:ring-slate-300 dark:!bg-slate-800 dark:!text-white dark:border-slate-700 dark:focus:ring-slate-600"
                    >
                        <option value="">All Regions</option>
                        {REGIONS.map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-white">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {filteredCountries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {filteredCountries.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            ) : (
                <div className="text-center mt-12">
                    <p className="text-lg text-slate-600 dark:text-slate-400">No countries found matching your search.</p>
                </div>
            )}
        </div>
    );
}