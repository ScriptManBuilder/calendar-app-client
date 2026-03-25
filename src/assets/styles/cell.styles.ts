import styled from 'styled-components';

export const CellWrapper = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isDragOver: boolean;
}>`
  background: ${(p) => {
    if (p.$isDragOver) return '#e4f0f6';
    return p.$isCurrentMonth ? '#fff' : '#f4f5f7';
  }};
  padding: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background 0.15s;
  min-height: 0;

  @media (max-width: 768px) {
    padding: 3px;
  }

  @media (max-width: 425px) {
    padding: 2px;
    min-height: 52px;
  }

  @media (max-width: 374px) {
    padding: 1px;
    min-height: 44px;
  }
`;

export const CellHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  flex-shrink: 0;
  gap: 2px;
  min-width: 0;

  @media (max-width: 374px) {
    padding: 1px 2px;
  }
`;

export const DayNumber = styled.span<{ $isToday: boolean }>`
  font-size: 13px;
  font-weight: ${(p) => (p.$isToday ? 700 : 400)};
  color: ${(p) => (p.$isToday ? '#fff' : '#5e6c84')};
  background: ${(p) => (p.$isToday ? '#026aa7' : 'transparent')};
  padding: 2px 6px;
  border-radius: 12px;
  line-height: 1.4;

  @media (max-width: 425px) {
    font-size: 11px;
    padding: 1px 4px;
  }

  @media (max-width: 374px) {
    font-size: 9px;
    padding: 1px 3px;
  }
`;

export const TaskCount = styled.span`
  font-size: 11px;
  color: #8c8c8c;
  white-space: nowrap;
  flex-shrink: 0;

  .count-label {
    display: inline;
  }

  @media (max-width: 768px) {
    font-size: 9px;

    .count-label {
      display: none;
    }
  }

  @media (max-width: 374px) {
    display: none;
  }
`;

export const TaskList = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c9cc;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    max-height: 90px;
  }

  @media (max-width: 425px) {
    max-height: 70px;
  }

  @media (max-width: 374px) {
    max-height: 55px;
  }
`;

export const AddTaskButton = styled.button`
  margin-top: 2px;
  padding: 2px 4px;
  font-size: 12px;
  color: #8c8c8c;
  text-align: left;
  border-radius: 3px;
  flex-shrink: 0;

  .short {
    display: none;
  }

  &:hover {
    background: #e2e4e6;
    color: #5e6c84;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 3px 2px;
    text-align: center;
    width: 100%;
    margin-top: 1px;

    .full {
      display: none;
    }

    .short {
      display: inline;
      font-size: 16px;
      font-weight: 700;
    }
  }

  @media (max-width: 374px) {
    margin-top: 1px;
    padding: 2px;
    line-height: 1;
  }
`;

export const DropIndicator = styled.div`
  height: 2px;
  background: #026aa7;
  border-radius: 1px;
  margin: 1px 0;
  flex-shrink: 0;
`;
