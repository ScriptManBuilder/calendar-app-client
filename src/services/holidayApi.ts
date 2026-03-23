import type { Holiday, Country } from '../types';

const NAGER_API = 'https://date.nager.at/api/v3';

export const holidayApi = {
  getHolidays: async (year: number, countryCode: string): Promise<Holiday[]> => {
    const res = await fetch(
      `${NAGER_API}/PublicHolidays/${encodeURIComponent(String(year))}/${encodeURIComponent(countryCode)}`,
    );
    if (!res.ok) throw new Error('Failed to fetch holidays');
    return res.json();
  },

  getCountries: async (): Promise<Country[]> => {
    const res = await fetch(`${NAGER_API}/AvailableCountries`);
    if (!res.ok) throw new Error('Failed to fetch countries');
    return res.json();
  },
};
