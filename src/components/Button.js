import styled, { css } from 'styled-components';

export default styled.button`
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  padding: 0 16px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background-color: #ccc;
    cursor: default;
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background-color: ${theme.colors.danger.light};
    }

    &:active {
      background-color: ${theme.colors.danger.dark};
    }
  `}
`;
