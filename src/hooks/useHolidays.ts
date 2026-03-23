import { useState, useEffect, useCallback } from 'react';
import type { Holiday } from '../types';
import { holidayApi } from '../services/holidayApi';

export function useHolidays(year: number, month: number, countryCode: string) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    // Fetch holidays for current year; also fetch adjacent year if
    // the visible grid spans a year boundary (Jan ↔ Dec).
    const yearsToFetch = new Set([year]);
    if (month === 0) yearsToFetch.add(year - 1);
    if (month === 11) yearsToFetch.add(year + 1);

    Promise.all(
      Array.from(yearsToFetch).map((y) =>
        holidayApi.getHolidays(y, countryCode),
      ),
    )
      .then((results) => setHolidays(results.flat()))
      .catch(() => setHolidays([]));
  }, [year, month, countryCode]);

  const getHolidaysForDate = useCallback(
    (date: string) => holidays.filter((h) => h.date === date),
    [holidays],
  );

  return { holidays, getHolidaysForDate };
}
