import { getCountryByCode } from "@/lib/api";
import Link from "next/link";

interface Props {
    params: Promise<{ code: string }>;
}

export default async function CountryDetailPage({ params }: Props) {
    const { code } = await params;
    const country = await getCountryByCode(code);

    if (!country) {
        return <div className="p-8">Country not found</div>;
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="p-8">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 rounded bg-white px-6 py-2 shadow hover:shadow-md dark:bg-gray-800"
                >
                    ← Back
                </Link>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Flag */}
                    <div>
                        <img
                            src={country.flags.svg}
                            alt={country.name.common}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-6 rounded-lg bg-white p-8 shadow dark:bg-gray-800">
                        <h1 className="text-4xl font-bold">{country.name.common}</h1>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Native Name
                                </p>
                                <p className="text-lg">{nativeName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Population
                                </p>
                                <p className="text-lg">{country.population.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Region
                                </p>
                                <p className="text-lg">{country.region}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Sub Region
                                </p>
                                <p className="text-lg">{country.subregion || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Capital
                                </p>
                                <p className="text-lg">{country.capital?.[0] || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    TLD
                                </p>
                                <p className="text-lg">{country.tld?.[0] || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Currencies
                                </p>
                                <p className="text-lg">{currencies}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    Languages
                                </p>
                                <p className="text-lg">{languages}</p>
                            </div>
                        </div>

                        {/* Border Countries */}
                        {country.borders && country.borders.length > 0 && (
                            <div>
                                <p className="mb-3 font-semibold">Border Countries</p>
                                <div className="flex flex-wrap gap-2">
                                    {country.borders.map((borderCode: string) => (
                                        <Link
                                            key={borderCode}
                                            href={`/country/${borderCode}`}
                                            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
        </div>
    );
}