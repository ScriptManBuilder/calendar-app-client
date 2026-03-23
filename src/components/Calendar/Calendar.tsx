import { useState, useCallback, useEffect } from 'react';
import type { Task, Country } from '../../types';
import { useCalendar } from '../../hooks/useCalendar';
import { useTasks } from '../../hooks/useTasks';
import { useHolidays } from '../../hooks/useHolidays';
import { holidayApi } from '../../services/holidayApi';
import { WEEKDAYS, WEEKDAYS_SHORT } from '../../utils/calendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarCell } from './CalendarCell';
import {
  CalendarWrapper,
  WeekdayHeader,
  WeekdayCell,
  CalendarGrid,
} from '../../assets/styles/calendar.styles';

export const Calendar = () => {
  const { year, month, days, goToPrevMonth, goToNextMonth, goToToday } =
    useCalendar();
  const { tasks, addTask, updateTask, deleteTask, moveTask, reorderTask } =
    useTasks(year, month);

  const [selectedCountry, setSelectedCountry] = useState(
    () => localStorage.getItem('selectedCountry') ?? 'US',
  );

  useEffect(() => {
    localStorage.setItem('selectedCountry', selectedCountry);
  }, [selectedCountry]);
  const { getHolidaysForDate } = useHolidays(year, month, selectedCountry);

  const [countries, setCountries] = useState<Country[]>([]);
  const [searchText, setSearchText] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    holidayApi
      .getCountries()
      .then((list) => setCountries(list.sort((a, b) => a.name.localeCompare(b.name))))
      .catch(() => {});
  }, []);

  /* ── Derived data ─────────────────────────────────────── */

  const filteredTasks = searchText.trim()
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(searchText.trim().toLowerCase()),
      )
    : tasks;

  const getTasksForDate = useCallback(
    (date: string) =>
      filteredTasks
        .filter((t) => t.date === date)
        .sort((a, b) => a.order - b.order),
    [filteredTasks],
  );

  /* ── Drag-and-drop ────────────────────────────────────── */

  const handleDrop = useCallback(
    (targetDate: string, targetIndex: number) => {
      if (!draggedTask) return;

      if (draggedTask.date === targetDate) {
        reorderTask(draggedTask._id, targetDate, targetIndex);
      } else {
        moveTask(draggedTask._id, targetDate, targetIndex);
      }
      setDraggedTask(null);
    },
    [draggedTask, moveTask, reorderTask],
  );

  const handleDragEnd = useCallback(() => setDraggedTask(null), []);

  /* ── Render ───────────────────────────────────────────── */

  return (
    <CalendarWrapper>
      <CalendarHeader
        year={year}
        month={month}
        searchText={searchText}
        onSearchChange={setSearchText}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />

      <WeekdayHeader>
        {WEEKDAYS.map((day, i) => (
          <WeekdayCell key={day}>
            <span className="full">{day}</span>
            <span className="short">{WEEKDAYS_SHORT[i]}</span>
          </WeekdayCell>
        ))}
      </WeekdayHeader>

      <CalendarGrid>
        {days.map((day) => (
          <CalendarCell
            key={day.date}
            day={day}
            tasks={getTasksForDate(day.date)}
            holidays={getHolidaysForDate(day.date)}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            draggedTask={draggedTask}
            onDragStart={setDraggedTask}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          />
        ))}
      </CalendarGrid>
    </CalendarWrapper>
  );
};
