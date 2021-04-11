import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const Container = styled.div`
  min-height: 150vh;
  font-family: 'Work Sans', sans-serif;
  margin-top: 80px;
  display: flex;
  .left-panel {
    margin-right: 40px;
  }
`;

export const MainContent = styled.div`
  flex: 2;
  width: 1140px;

  p {
    padding: 0;
    font-weight: normal;
    font-size: 20px;
  }


  .shop-info {
    display: flex;

    p {
      font-size: 18px;
    }

    .wrapper {
      display: flex;
      width: 364px;
    }

    svg {
      margin-right: 16px;
    }
  }

  .website-group {
    margin: 56px 0;
    display: grid;
    grid-column-gap: 40px;
    grid-row-gap: 24px;
    grid-template-columns: repeat(2, 1fr);
  }

  .product-group {
    display: flex;
  }

  .info-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .error {
    margin-left: 16px;
  }

  .edit-img {
    margin-right: 8px;
  }

  .sample {
    margin-top: 8px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
  }

  .edit {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
  }

  .email {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
  }

  .email-info {
    border-bottom: 1px solid rgb(201, 201, 201, 0.5);
    padding-bottom: 8px;
  }

  .email-number {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
  }

  .number-info {
    border-bottom: 1px solid rgb(201, 201, 201, 0.5);
    padding-bottom: 8px;
  }

  .title-info {
    display: flex;
  }

  .title-info span {
    margin: auto 0;
  }

  .ship-title {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #333333;
  }

  .ship-info {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(201, 201, 201, 0.5);
    padding-bottom: 8px;
  }

  .notify {
    margin-top: 34px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(201, 201, 201, 0.5);
    padding-bottom: 8px;
  }

  .notify-title {
    font-family: Work Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
  }

  .notify-info {
    display: flex;
  }

  .notify-info span {
    margin: auto 0;
  }

  .bell {
    margin-right: 16px;
  }

  @media screen and (max-width: 800px) {
    body {
      width: auto;
    }

    .container {
      width: 329px;
      margin: auto;
    }

    .email-number {
      grid-template-columns: repeat(1, 1fr);
    }
    .info-wrapper {
      display: flex;
      justify-content: space-between;
    }

    .error {
      margin-left: 8px;
      height: 14.5px;
      width: 14.5px;
    }

    .edit-img {
      margin: auto 8px auto 0;
      width: 10px;
    }

    .sample {
      margin-top: 4px;
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }

    .edit {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 24px;
      text-align: right;
      color: #000000;
    }

    .email {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      color: #000000;
    }

    .email-info {
      border-bottom: 1px solid rgb(201, 201, 201, 0.5);
      padding-bottom: 2px;
    }

    .number-info {
      border-bottom: 1px solid rgb(201, 201, 201, 0.5);
      padding-bottom: 2px;
      margin-top: 16px;
    }

    .title-info {
      display: flex;
    }

    .title-info span {
      margin: auto 0;
    }

    .ship-title {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      color: #000000;
    }

    .ship-info {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(201, 201, 201, 0.5);
      padding-bottom: 2px;
    }

    .notify {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(201, 201, 201, 0.5);
      padding-bottom: 2px;
    }

    .notify-title {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      color: #000000;
    }

    .notify-info {
      display: flex;
    }

    .notify-info span {
      margin: auto 0;
    }

    .bell {
      margin: auto 8px auto 0;
      height: 14.5px;
      width: 14.5px;
    }

    .arrow {
      height: 10px;
    }
  }
`;
