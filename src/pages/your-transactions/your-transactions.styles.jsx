import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const Container = styled.div`
  display: flex;
  .box-left {
    width: 655px;
    border-radius: 5px;
    padding: 0 24px 0 0;
    .h2 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .h2:not(:first-child) {
      margin-top: 30px;
    }

    .col {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: flex;
      .checkbox {
        width: 50%;
      }
    }
    .mar-left {
      margin-left: 60px;
    }

    input[type='text'] {
      background: none;
      width: 100%;
      outline: 0;
      border-width: 0 0 2px;
      border-color: rgb(0, 0, 0, 0.08);
      padding: 6px 0;
      font-size: 18px;
      margin: 8px 0 24px 0;
    }
    .checkbox {
      width: 100%;
      margin: 0 auto 18px;
      position: relative;
      display: flex;
      align-items: center;

      label {
        position: relative;
        cursor: pointer;

        padding-left: 20px;
        span {
          margin-left: 12px;
        }
        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 15px;
          transition: transform 0.28s ease;
          border-radius: 3px;
          background-color: rgb(0, 0, 0, 0.2);
        }
        &:after {
          content: '';
          display: block;
          width: 9px;
          height: 4.5px;
          border-bottom: 2px solid #fff;
          border-left: 2px solid #fff;
          transform: rotate(-45deg) scale(0) translate(-50%, -50%);
          transition: transform ease 0.25s;
          position: absolute;
          top: 7px;
          left: 5px;
        }
      }
      input[type='checkbox'] {
        width: auto;
        opacity: 0.00000001;
        position: absolute;
        left: 0;
        margin-left: -20px;
        &:checked ~ label {
          &:before {
            background-color: ${mainColor};
            border: 2px solid ${mainColor};
          }
          &:after {
            transform: rotate(-45deg) scale(1);
          }
        }
        &:focus + label::before {
          outline: 0;
        }
      }
    }

    .PhoneInput {
      margin: 10px 0 24px 0;
    }

    button {
      width: 100%;
      color: ${mainColor};
      font-size: 18px;
      font-weight: 500;
      background-color: #f1f1f1;
      border: 0;
      outline: 0;
      padding: 14px 0;
      margin-top: 40px;
      border-radius: 3px;
      box-shadow: 0 0 8px rgba(196, 196, 196, 0.2);
    }
  }

  .title {
    margin: 40px 0 16px;
  }

  .select-wrapper {
    display: grid;
    grid-gap: 16px;
		grid-template-columns: repeat(2, 1fr);
    margin: 20px 0;
  }
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;
