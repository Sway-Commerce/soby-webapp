import styled from 'styled-components';
import { mainColor, subColor } from 'shared/css-variable/variable';
import {borderColor} from '../../shared/css-variable/variable';

export const BoxContainer = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: repeat(6, 1fr);
`;

export const NumberBox = styled.input`
  &[type='number'] {
    height: 70px;
    width: 50px;
    font-size: 0.9rem;
    text-align: center;
    background: #ffffff;
    border: 1.04651px solid ${borderColor};
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

export const InputCode = styled.input.attrs((props) => ({
  type: "text",
}))`
  width: 46px;
  height: 62px;
  padding: 20px;
  outline: 0;
  border: 0;
  border-radius: 3px;
  border: 0.5px solid #c2c2c2;
  font-size: 0.9rem;
  margin-right: 20px;
  box-sizing: border-box;
`;
