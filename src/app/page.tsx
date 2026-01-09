import { getAllCountries } from "@/lib/api";
import CountryList from "@/components/CountryList";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {

  const countries = await getAllCountries();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <header className="flex justify-between items-center py-4 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Where in the world?
          </h1>
          <div className="flex items-center gap-4">
            <Link 
                href="/favorites"
                className="text-sm font-semibold hover:underline hidden sm:block"
            >
                ❤️ Favorites
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <CountryList initialCountries={countries} />
      </div>
    </main>
  );
}