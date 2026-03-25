import styled from 'styled-components';

/* ── Task card ─────────────────────────────────────────── */

export const TaskCard = styled.div<{ $isDragging: boolean }>`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  padding: 6px 8px;
  margin-bottom: 4px;
  cursor: grab;
  opacity: ${(p) => (p.$isDragging ? 0.4 : 1)};
  position: relative;
  font-size: 13px;
  word-break: break-word;
  transition: background 0.15s;

  &:hover {
    background: #f4f5f7;
  }

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    padding: 4px 6px;
    margin-bottom: 3px;
  }

  @media (max-width: 425px) {
    padding: 3px 4px;
    margin-bottom: 2px;
    font-size: 11px;
  }

  @media (max-width: 374px) {
    padding: 2px 3px;
    margin-bottom: 1px;
    font-size: 10px;
    box-shadow: none;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 2px;
  }
`;

export const LabelsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 4px;

  @media (max-width: 374px) {
    gap: 2px;
    margin-bottom: 2px;
  }
`;

export const LabelBadge = styled.div<{ $color: string }>`
  background: ${(p) => p.$color};
  height: 8px;
  width: 40px;
  border-radius: 4px;

  @media (max-width: 425px) {
    height: 6px;
    width: 24px;
    border-radius: 3px;
  }

  @media (max-width: 374px) {
    height: 4px;
    width: 16px;
  }
`;

export const TaskTitle = styled.span`
  display: block;
  line-height: 1.3;

  @media (max-width: 425px) {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TaskActions = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
  gap: 2px;

  ${TaskCard}:hover & {
    display: flex;
  }

  @media (max-width: 768px) {
    display: flex;
    position: static;
    margin-top: 2px;
  }
`;

export const TaskActionBtn = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 12px;
  color: #6b778c;
  background: #f4f5f7;

  &:hover {
    background: #dfe1e6;
    color: #333;
  }

  @media (max-width: 425px) {
    width: 18px;
    height: 18px;
    font-size: 10px;
  }
`;

/* ── Inline form ───────────────────────────────────────── */

export const MobileFormOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
`;

export const MobileFormContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
`;

export const MobileFormTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 12px;
`;

export const TaskFormWrapper = styled.div`
  margin-bottom: 4px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 2px solid #026aa7;
  border-radius: 3px;
  font-size: 13px;
  outline: none;
  background: #fff;

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 16px;
    border-radius: 6px;
  }
`;

export const LabelPicker = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 12px;
  }
`;

export const LabelOption = styled.button<{
  $color: string;
  $selected: boolean;
}>`
  width: 24px;
  height: 16px;
  border-radius: 3px;
  background: ${(p) => p.$color};
  opacity: ${(p) => (p.$selected ? 1 : 0.35)};
  border: 2px solid ${(p) => (p.$selected ? '#172b4d' : 'transparent')};
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 24px;
    border-radius: 4px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;

  @media (max-width: 768px) {
    gap: 8px;
    margin-top: 16px;
  }
`;

export const FormButton = styled.button<{
  $variant?: 'primary' | 'secondary';
}>`
  padding: 4px 12px;
  border-radius: 3px;
  font-size: 13px;
  background: ${(p) =>
    p.$variant === 'primary' ? '#026aa7' : '#e2e4e6'};
  color: ${(p) => (p.$variant === 'primary' ? '#fff' : '#333')};

  &:hover {
    background: ${(p) =>
      p.$variant === 'primary' ? '#0079bf' : '#cdd2d4'};
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 15px;
    border-radius: 6px;
    flex: 1;
  }
`;

/* ── Holiday badge ─────────────────────────────────────── */

export const HolidayBadge = styled.div`
  background: #f0e6f6;
  color: #6b3fa0;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;

  @media (max-width: 425px) {
    font-size: 9px;
    padding: 1px 4px;
  }

  @media (max-width: 374px) {
    font-size: 8px;
    padding: 1px 3px;
    margin-bottom: 2px;
  }
`;
