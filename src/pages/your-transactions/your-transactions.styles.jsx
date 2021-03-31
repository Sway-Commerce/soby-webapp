import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const Container = styled.div`
  display: flex;
  .box-left {
    border-radius: 5px;
    padding: 0 24px 0 0;
    margin-top: 48px;
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

    .border {
      border-bottom: 1px solid rgb(201, 201, 201, 0.5);
    }

    .details-status {
      display: flex;
      margin: 31px 0 31px 284px;
    }

    .status-img {
      height: 20px;
      margin-right: 8px;
    }

    .details-order {
      margin-left: 40px;
    }

    .cost {
      font-family: Work Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #000000;
      margin-top: 8px;
    }

    .sort {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;
      color: #000000;
    }

    .container-order {
      display: flex;
      margin-top: 28px;
    }

    .box {
      width: 83px;
      height: 83px;
      background: #c4c4c4;
      border-radius: 8px;
    }

    .container-status {
      display: flex;
      margin-top: 32px;

    }
  }

  .title {
    margin: 40px 0 16px;
  }

  .select-wrapper {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 0 20px;
  }

  .sub-filter {
    margin-top: 32px;
  }
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;
