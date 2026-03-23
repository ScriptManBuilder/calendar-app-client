import type { Holiday } from '../../types';
import { HolidayBadge } from '../../assets/styles/task.styles';

interface HolidayLabelProps {
  holiday: Holiday;
}

export const HolidayLabel = ({ holiday }: HolidayLabelProps) => (
  <HolidayBadge title={holiday.name}>{holiday.localName}</HolidayBadge>
);
