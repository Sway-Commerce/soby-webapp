import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const Container = styled.div`
  font-family: 'Work Sans', sans-serif;
  .main-content {
    width: 461px;
    height: 785px;
    display: flex;
    margin: 20px auto 0;

    .content-left {
      border-radius: 5px;
      box-shadow: 0 2px 8px rgb(0, 0, 0 0.1);
      .box-top {
        position: relative;
        padding: 40px 32px;
        background: #f1f1f1;
        border-radius: 0px 0px 30px 30px;
        min-width: 461px;

        .item-wrapper {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;

          .status {
            display: flex;
          }

          .auto-fit {
            margin: auto 0;
          }
        }

        .item-2 {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .last {
            text-align: right;
          }

          button {
            margin-left: 18px;
            padding: 8px 14px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #5e5a53;
          }
        }

        .mar {
          margin: 20px 0;
        }

        .box-tag {
          position: absolute;
          top: calc(100% - 30px);
          left: 20px;
          width: 421px;
          background: #ffffff;
          /* Drop Shadow */
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.07);
          border-radius: 8px;
          padding: 12px;
        }
        .payinfo-wrapper {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          & + .payinfo-wrapper {
            margin-top: 4px;
          }

          &.total {
            margin-top: 20px;
          }
        }

        .header-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .shop-name {
            display: flex;
            flex: 2;
            img + p {
              margin: auto 0 auto 22px;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 8px;
            }
          }
          svg {
            margin: auto 0;
          }
        }

        .option-chip {
          background: #ffffff;
          border: 1px solid rgb(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
        }

        .accordion-wrapper {
          margin-top: 16px;
        }
      }

      /* button {
        width: 461px;
        height: 60px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.07);
        border-radius: 8px;
        border: none;
        color: ${mainColor};
        font-size: 20px;
        line-height: 26px;
      } */

      .check-out {
        width: 461px;
        height: 60px;
        border-radius: 12px;
        padding: 17px 24px;
        color: #fff;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        background-color: ${mainColor};
        position: relative;
        cursor: pointer;
        .price {
          border-left: 3px solid #fff;
          text-align: right;
        }
      }
    }
  }
`;

export const ShippingCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 21px 16px 16px;
  margin-top: 16px;
  .shipping-wrapper {
    display: flex;
    justify-content: space-between;
    * {
      margin: auto 0;
    }
    .tracking-code {
      max-width: 200px;
    }
    .method {
      font-size: 12px;
      cursor: pointer;
    }
  }

  .shipping-location {
    max-width: 360px;
    font-size: 14px;
    margin-top: 16px;
    & + .shipping-wrapper {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgb(0, 0, 0, 0.5);
    }
  }
`;
