'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Country } from '@/types';
import { CountryCard } from '@/components/CountryCard';
import { useCompareStore } from '@/store/compareStore';
import Link from 'next/link';

interface CountryListProps {
    initialCountries: Country[];
}

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const ITEMS_PER_PAGE = 12;

export default function CountryList({ initialCountries }: CountryListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    
    // INFINITE SCROLL STATE
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const observerTarget = useRef(null);
    
    const { selectedCountries, clearSelection } = useCompareStore();

    // 1. Filter the full list
    const filteredCountries = initialCountries.filter((country) => {
        const matchesSearch = country.name.common 
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
            
        const matchesRegion = selectedRegion === '' || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    // 2. Slice the list to show only the "visible" amount
    const visibleCountries = filteredCountries.slice(0, visibleCount);

    // Reset visible count when search changes
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        window.scrollTo(0, 0);
    }, [searchTerm, selectedRegion]);

    // 3. The Scroll Observer Function
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting) {
            setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
    }, []);

    // 4. Attach the Observer
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        });
        
        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [handleObserver]);

    return (
        <div className="space-y-8 pb-20">
            {/* Search and Filter Inputs */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    suppressHydrationWarning
                    className="w-full md:w-1/3 p-3 rounded-md shadow-sm border outline-none transition-colors bg-white text-slate-900 border-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-300 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:focus:ring-slate-600 dark:placeholder:text-slate-400"
                />
                
                <div className="relative">
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        suppressHydrationWarning
                        className="p-3 pr-10 rounded-md shadow-sm border outline-none cursor-pointer transition-colors appearance-none bg-white text-slate-900 border-slate-200 focus:ring-2 focus:ring-slate-300 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:focus:ring-slate-600"
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

            {/* Country Grid */}
            {visibleCountries.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {visibleCountries.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>

                    {/* Infinite Scroll Trigger: This div sits at the bottom */}
                    {visibleCount < filteredCountries.length && (
                        <div ref={observerTarget} className="h-20 w-full flex justify-center items-center mt-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center mt-12">
                    <p className="text-lg text-slate-600 dark:text-slate-400">No countries found matching your search.</p>
                </div>
            )}

            {/* Compare Floating Bar (Bonus Feature) */}
            {selectedCountries.length > 0 && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-6 animate-slide-up">
                    <div className="text-sm font-semibold">
                        {selectedCountries.length} / 2 Selected
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={clearSelection}
                            className="text-xs underline opacity-80 hover:opacity-100"
                        >
                            Clear
                        </button>
                        {selectedCountries.length === 2 && (
                            <Link
                                href="/compare"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-bold transition-colors"
                            >
                                Compare Now
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}