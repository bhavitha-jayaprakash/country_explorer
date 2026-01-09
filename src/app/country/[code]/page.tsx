import { getCountryByCode } from "@/lib/api";
import Link from "next/link";

interface Props {
    params: Promise<{ code: string }>;
}

export default async function CountryDetailPage({ params }: Props) {
    const { code } = await params;
    const country = await getCountryByCode(code);

    if (!country) {
        return <div className="p-8 text-center">Country not found</div>;
    }

    const nativeName = country.name?.nativeName
        ? Object.values(country.name.nativeName)[0]?.common || "N/A"
        : "N/A";

    const currencies = country.currencies
        ? Object.values(country.currencies)
                .map((c: any) => c.name)
                .join(", ")
        : "N/A";

    const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

    return (
        /* GLOBAL FIX: 
           We set the background and text color ONCE here on the parent div.
           Everything inside will inherit these colors automatically.
        */
        <div className="min-h-screen p-8 transition-colors duration-300 bg-background text-foreground">
            <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 rounded px-6 py-2 shadow transition-transform hover:scale-105 border border-slate-200 bg-white text-slate-900 dark:bg-slate-800 dark:text-white dark:border-slate-700"
            >
                ← Back
            </Link>

            <div className="grid gap-12 md:grid-cols-2 items-center">
                <div>
                    <img
                        src={country.flags.svg}
                        alt={country.name.common}
                        className="w-full rounded-lg shadow-xl object-cover"
                    />
                </div>

                <div className="space-y-8">
                    <h1 className="text-4xl font-extrabold">
                        {country.name.common}
                    </h1>

                    <div className="grid gap-4 sm:grid-cols-2 text-base">
                        <div>
                            <p className="font-semibold">
                                Native Name: <span className="font-normal opacity-80">{nativeName}</span>
                            </p>
                            <p className="font-semibold">
                                Population: <span className="font-normal opacity-80">{country.population.toLocaleString()}</span>
                            </p>
                            <p className="font-semibold">
                                Region: <span className="font-normal opacity-80">{country.region}</span>
                            </p>
                            <p className="font-semibold">
                                Sub Region: <span className="font-normal opacity-80">{country.subregion || "N/A"}</span>
                            </p>
                            <p className="font-semibold">
                                Capital: <span className="font-normal opacity-80">{country.capital?.[0] || "N/A"}</span>
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold">
                                Top Level Domain: <span className="font-normal opacity-80">{country.tld?.[0] || "N/A"}</span>
                            </p>
                            <p className="font-semibold">
                                Currencies: <span className="font-normal opacity-80">{currencies}</span>
                            </p>
                            <p className="font-semibold">
                                Languages: <span className="font-normal opacity-80">{languages}</span>
                            </p>
                        </div>
                    </div>

                    {country.borders && country.borders.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Border Countries:</h3>
                            <div className="flex flex-wrap gap-3">
                                {country.borders.map((borderCode: string) => (
                                    <Link
                                        key={borderCode}
                                        href={`/country/${borderCode}`}
                                        className="rounded px-4 py-1 shadow-sm text-sm transition-colors border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
                                    >
                                        {borderCode}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}