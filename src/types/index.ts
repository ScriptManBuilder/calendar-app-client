export interface Task {
  _id: string;
  title: string;
  date: string; // YYYY-MM-DD
  order: number;
  labels: string[]; // color hex values
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface CalendarDay {
  date: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
}

export interface Country {
  countryCode: string;
  name: string;
}
