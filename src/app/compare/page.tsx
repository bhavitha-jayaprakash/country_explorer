'use client';

import { useCompareStore } from '@/store/compareStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ComparePage() {
    const { selectedCountries, clearSelection } = useCompareStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (selectedCountries.length < 2) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-2xl font-bold mb-4">Select 2 countries to compare</h1>
                <Link href="/" className="px-6 py-2 bg-slate-900 text-white rounded">Back to Home</Link>
            </div>
        );
    }

    const [c1, c2] = selectedCountries;

    return (
        <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">Comparison</h1>
                <div className="flex gap-4">
                    <button onClick={clearSelection} className="px-4 py-2 border rounded hover:bg-slate-100 dark:hover:bg-slate-800">Clear</button>
                    <Link href="/" className="px-4 py-2 bg-slate-900 text-white rounded dark:bg-white dark:text-slate-900">Back</Link>
                </div>
            </header>

            <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                <div className="col-span-1"></div>
                <div className="col-span-1 text-center font-bold text-xl">{c1.name.common}</div>
                <div className="col-span-1 text-center font-bold text-xl">{c2.name.common}</div>

                {/* Flag Row */}
                <div className="col-span-1 font-semibold py-4 flex items-center">Flag</div>
                <div className="col-span-1 flex justify-center py-4"><img src={c1.flags.svg} className="w-32 h-20 object-cover shadow-md rounded" /></div>
                <div className="col-span-1 flex justify-center py-4"><img src={c2.flags.svg} className="w-32 h-20 object-cover shadow-md rounded" /></div>

                {/* Population */}
                <div className="col-span-1 font-semibold py-4 border-t">Population</div>
                <div className="col-span-1 text-center py-4 border-t">{c1.population ? c1.population.toLocaleString() : 'N/A'}</div>
                <div className="col-span-1 text-center py-4 border-t">{c2.population ? c2.population.toLocaleString() : 'N/A'}</div>

                {/* Region */}
                <div className="col-span-1 font-semibold py-4 border-t">Region</div>
                <div className="col-span-1 text-center py-4 border-t">{c1.region}</div>
                <div className="col-span-1 text-center py-4 border-t">{c2.region}</div>

                {/* Capital */}
                <div className="col-span-1 font-semibold py-4 border-t">Capital</div>
                <div className="col-span-1 text-center py-4 border-t">{c1.capital?.[0] || 'N/A'}</div>
                <div className="col-span-1 text-center py-4 border-t">{c2.capital?.[0] || 'N/A'}</div>
                
                 {/* Area */}
                 <div className="col-span-1 font-semibold py-4 border-t">Area (km²)</div>
                <div className="col-span-1 text-center py-4 border-t">{c1.area ? c1.area.toLocaleString() : 'N/A'}</div>
                <div className="col-span-1 text-center py-4 border-t">{c2.area ? c2.area.toLocaleString() : 'N/A'}</div>
            </div>
        </main>
    );
}