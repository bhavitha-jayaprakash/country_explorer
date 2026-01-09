'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    if (!mounted) {
        return <div className="w-16 h-8 rounded-full bg-white border-2 border-slate-200 dark:bg-slate-700 dark:border-none" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400
                ${theme === 'dark' ? 'bg-slate-700 border-none' : 'bg-white border-2 border-slate-200'}
            `}
            aria-label="Toggle Dark Mode"
            title="Toggle Theme"
        >
            <div
                className={`
                    bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                    ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}
                `}
            >
                <span className="text-xs leading-none">
                    {theme === 'dark' ? '🌙' : '☀️'}
                </span>
            </div>
        </button>
    );
}