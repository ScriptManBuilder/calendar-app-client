import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background: #026aa7;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 8px 10px;
    gap: 8px;
  }

  @media (max-width: 425px) {
    padding: 6px 8px;
    gap: 6px;
  }

  @media (max-width: 374px) {
    padding: 4px 6px;
    gap: 4px;
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 425px) {
    gap: 4px;
  }

  @media (max-width: 374px) {
    gap: 2px;
  }
`;

export const NavButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 425px) {
    width: 28px;
    height: 28px;
    font-size: 15px;
  }

  @media (max-width: 374px) {
    width: 24px;
    height: 24px;
    font-size: 13px;
  }
`;

export const MonthTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  min-width: 200px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 17px;
    min-width: 160px;
  }

  @media (max-width: 425px) {
    font-size: 15px;
    min-width: auto;
  }

  @media (max-width: 374px) {
    font-size: 13px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    order: 3;
  }

  @media (max-width: 425px) {
    gap: 4px;
  }

  @media (max-width: 374px) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const SearchInput = styled.input`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
  width: 220px;
  outline: none;
  transition: background 0.2s, width 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    width: 280px;

    &::placeholder {
      color: #999;
    }
  }

  @media (max-width: 768px) {
    flex: 1;
    width: auto;
    min-width: 0;

    &:focus {
      width: auto;
    }
  }

  @media (max-width: 425px) {
    padding: 5px 8px;
    font-size: 13px;
  }

  @media (max-width: 374px) {
    padding: 4px 6px;
    font-size: 12px;
  }
`;

export const CountrySelect = styled.select`
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 13px;
  outline: none;
  cursor: pointer;

  option {
    background: #fff;
    color: #333;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 425px) {
    padding: 5px 6px;
    font-size: 12px;
    max-width: 110px;
  }

  @media (max-width: 374px) {
    max-width: 100%;
    width: 100%;
    font-size: 11px;
  }
`;
