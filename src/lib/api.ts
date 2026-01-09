import { Country } from '@/types';

export async function getAllCountries(): Promise<Country[]> {
    try {
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,cca2'
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error;
    }
}

export async function getCountryByCode(code: string): Promise<Country> {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${code}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch country: ${response.statusText}`);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error(`Error fetching country with code ${code}:`, error);
        throw error;
    }
}