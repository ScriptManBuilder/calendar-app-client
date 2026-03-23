# Calendar App

A clean and responsive calendar application built with React and TypeScript. Manage your tasks day by day, reorder them with drag-and-drop, and see public holidays for any country in the world.

---

## Features

- **Monthly calendar view** — navigate between months with Previous / Next / Today buttons
- **Task management** — add, edit, and delete tasks directly inside each day cell
- **Color labels** — tag tasks with colored labels for quick visual grouping
- **Drag-and-drop** — reorder tasks within a day or move them to a different day
- **Search** — filter tasks across the whole calendar in real time
- **Public holidays** — choose any country to display its official public holidays (powered by [Nager.Date API](https://date.nager.at/))
- **Persistent country selection** — the selected country is saved in localStorage and restored on next visit
- **Responsive design** — works on desktop, tablet, and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Styling | styled-components |
| Build tool | Vite |
| Holidays API | Nager.Date (public, no key required) |
| Linting | ESLint + typescript-eslint |

---

## Project Structure

```
src/
├── components/
│   └── Calendar/
│       ├── Calendar.tsx        # Root calendar component
│       ├── CalendarCell.tsx    # Single day cell with tasks and holidays
│       ├── CalendarHeader.tsx  # Navigation, search, country picker
│       ├── HolidayLabel.tsx    # Holiday badge
│       ├── TaskForm.tsx        # Inline create / edit form
│       └── TaskItem.tsx        # Draggable task card
├── hooks/
│   ├── useCalendar.ts          # Month/year state and day grid logic
│   ├── useHolidays.ts          # Fetches holidays from Nager.Date
│   └── useTasks.ts             # CRUD + drag-and-drop task state
├── services/
│   ├── holidayApi.ts           # Nager.Date API client
│   └── taskApi.ts              # Task API client
├── assets/styles/              # styled-components style definitions
├── utils/                      # Calendar helpers
└── types/                      # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ScriptManBuilder/calendar-applicationDH.git
cd calendar-applicationDH/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
