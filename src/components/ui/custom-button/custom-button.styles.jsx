import styled, { css } from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

const buttonStyles = css`
  background-color: ${mainColor};
  color: white;
  border: 1px solid ${mainColor};
  width: 100%;
  height: 2.4rem;
  letter-spacing: 0.5px;
  text-transform: none;
  cursor: pointer;
  display: flex;
  border-radius: 6px;
  font-style: normal;
  font-weight: bold;
  line-height: 1.2rem;
  font-size: 0.8rem;
  align-items: center;
  outline: none;
`;

export const CustomButtonContainer = styled.button`
  justify-content: center;
  padding: 12px;
  ${buttonStyles}
`;

export const ButtonWithIcon = styled.div`
  justify-content: space-between;
  padding: 0 32px;
  ${buttonStyles}

  > * {
    margin: auto 0;
  }
`;
