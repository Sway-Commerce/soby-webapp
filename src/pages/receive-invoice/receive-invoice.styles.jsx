import styled from 'styled-components';
import {mainColor} from 'css-variable/variable';

export const Container = styled.div`
  .main-content {
    width: 461px;
    height: 785px;
    display: flex;
    margin: 20px auto 0;

    .content-left {
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.1);
      .box-top {
        position: relative;
        padding: 20px 60px 70px 60px;
        background: #f1f1f1;
        height: 335px;
        border-radius: 5px 5px 40px 40px;

        .item-wrapper {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;

          .status {
            display: flex;
            svg {
              margin: 5px 8px auto 0;
            }
            p {
              margin: auto 0;
            }
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
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: ${mainColor};
          width: 398px;
          height: 80px;
          border-radius: 12px;
          padding: 30px 21px 25px 17px;
          color: #fff;
          display: flex;
          justify-content: space-between;

          .last {
            border-left: 3px solid #fff;
            position: relative;
            top: 3px;
          }
          &::after {
            content: '';

            position: absolute;
            right: -20px;
            top: 26px;
            width: 0;
            height: 0;
            border-left: 10px solid #f1f1f1;
            border-top: 13px solid transparent;
            border-bottom: 22px solid transparent;
            border-right: 20px solid transparent;
            border-radius: 50%;
          }
        }

        .header-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .shop-name {
            display: flex;
            img + p {
              margin: auto 0 auto 22px;
            }
            img {
              width: 50px;
              height: 50px;
              border-radius: 8px;
            }
          }
        }
      }

      .box-bottom {
        border-radius: 5px;
        padding: 70px 24px 20px;

        .item-row {
          display: flex;
          font-size: 16px;
          margin-bottom: 16px;
          width: 413px;
          * {
            font-size: 16px;
          }

          .image {
            height: 50px;
            width: 50px;
            border-radius: 4px;
            background-color: #c4c4c4;
          }

          .info {
            margin: auto 0 auto 24px;
            flex: 2;
          }

          p {
            text-align: left;
          }
        }
      }

      button {
        width: 461px;
        height: 60px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.07);
        border-radius: 8px;
        border: none;
        color: ${mainColor};
        font-size: 20px;
        line-height: 26px;
      }
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;
    }
  }
`;
