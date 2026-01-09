'use client';

import Link from 'next/link';
import { Country } from '@/types';
import { motion } from 'framer-motion';

interface CountryCardProps {
    country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
    return (
        <Link href={`/country/${country.cca3}`}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-xl bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700"
            >
                <div className="h-40 w-full relative">
                    <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-extrabold mb-4 text-slate-900 dark:text-white">
                        {country.name.common}
                    </h2>
                    <div className="space-y-1 text-sm">
                        <p className="text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">Population:</span>{' '}
                            {country.population.toLocaleString()}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">Region:</span>{' '}
                            {country.region}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">Capital:</span>{' '}
                            {country.capital?.[0] || 'N/A'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}