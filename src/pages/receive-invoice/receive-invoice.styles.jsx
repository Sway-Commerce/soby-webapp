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
        padding: 47px 32px;
        background: #f1f1f1;
        height: 335px;
        border-radius: 0px 0px 30px 30px;
        min-width: 461px;

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
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-image: url('/images/subtract.png');
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
              width: 50px;
              height: 50px;
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
  }
`;
