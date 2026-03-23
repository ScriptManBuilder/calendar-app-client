import type { Country } from '../../types';
import { getMonthName } from '../../utils/calendar';
import {
  HeaderWrapper,
  NavSection,
  NavButton,
  MonthTitle,
  SearchWrapper,
  SearchInput,
  CountrySelect,
} from '../../assets/styles/header.styles';

interface CalendarHeaderProps {
  year: number;
  month: number;
  searchText: string;
  onSearchChange: (text: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  countries: Country[];
  selectedCountry: string;
  onCountryChange: (code: string) => void;
}

export const CalendarHeader = ({
  year,
  month,
  searchText,
  onSearchChange,
  onPrevMonth,
  onNextMonth,
  onToday,
  countries,
  selectedCountry,
  onCountryChange,
}: CalendarHeaderProps) => (
  <HeaderWrapper>
    <NavSection>
      <NavButton onClick={onPrevMonth} aria-label="Previous month">
        ‹
      </NavButton>
      <NavButton onClick={onToday} aria-label="Go to today" style={{ fontSize: 13, width: 'auto', padding: '0 10px' }}>
        Today
      </NavButton>
      <NavButton onClick={onNextMonth} aria-label="Next month">
        ›
      </NavButton>
      <MonthTitle>
        {getMonthName(month)} {year}
      </MonthTitle>
    </NavSection>

    <SearchWrapper>
      <CountrySelect
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        aria-label="Select country for holidays"
      >
        {countries.map((c) => (
          <option key={c.countryCode} value={c.countryCode}>
            {c.name}
          </option>
        ))}
      </CountrySelect>
      <SearchInput
        type="text"
        placeholder="Search tasks…"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchWrapper>
  </HeaderWrapper>
);
