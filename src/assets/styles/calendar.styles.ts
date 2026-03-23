import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #e2e4e6;
  border-bottom: 1px solid #cdd2d4;
  flex-shrink: 0;
`;

export const WeekdayCell = styled.div`
  padding: 8px 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #5e6c84;
  text-transform: uppercase;

  .short {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 6px 4px;
    font-size: 11px;
  }

  @media (max-width: 425px) {
    padding: 4px 2px;
    font-size: 10px;

    .full {
      display: none;
    }

    .short {
      display: inline;
    }
  }

  @media (max-width: 374px) {
    padding: 3px 1px;
    font-size: 9px;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  flex: 1;
  gap: 1px;
  background: #cdd2d4;
  overflow: hidden;

  @media (max-width: 425px) {
    overflow-y: auto;
  }
`;
