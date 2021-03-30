import React from 'react';

import styled from 'styled-components';
import { mainColor } from '../../../shared/css-variable/variable';

export const Container = styled.div`
  .checkbox-container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 34px;

    input {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
    }

    .checkmark {
      position: absolute;
      top: -15px;
      left: 0;
      height: 16px;
      width: 16px;
      background-color: rgb(0, 0, 0, 0.2);
      border-radius: 4px;
      cursor: pointer;

      &::after {
        content: '';
        position: absolute;
        display: none;
        left: 3px;
        top: 3px;
        width: 9px;
        height: 4px;
        border: solid #fff;
        border-width: 0 0 1px 1px;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }

    &:hover input ~ .checkmark,
    &:active input ~ .checkmark {
      border-color: ${mainColor};
    }

    input:checked ~ .checkmark {
      background-color: ${mainColor};
      border-color: ${mainColor};

      &::after {
        display: block;
      }
    }

    input:disabled {
      & ~ .checkmark {
        cursor: default;
        background-color: #fff;
        border-color: #a1acb3;

        &::after {
          display: block;
          border-color: #a1acb3;
        }
      }

      &:hover,
      &:active {
        ~ .checkmark {
          border-color: #a1acb3;
        }
      }
    }
  }
`;

const Checkbox = ({ handleChange, label, ...props }) => {
  return (
    <Container>
      <label
        className="checkbox-container"
      >
        <input
          type="checkbox"
          {...props}
          onChange={handleChange}
        />
        <span className="checkmark"></span>
      </label>
      <span>{label}</span>
    </Container>
  );
};

export default Checkbox;
