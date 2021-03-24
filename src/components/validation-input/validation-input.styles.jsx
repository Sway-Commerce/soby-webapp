import styled from 'styled-components';
import { mainColor, subColor } from 'css-variable/variable';

export const BoxContainer = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: repeat(6, 1fr);
`;

export const NumberBox = styled.input`
  &[type='number'] {
    height: 70px;
    width: 50px;
    font-size: 18px;
    text-align: center;
    background: #ffffff;
    border: 1px solid ${subColor};
    box-sizing: border-box;
    border-radius: 8px;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
    outline: none;
    border: 1px solid ${mainColor};
  }
  }
`;
