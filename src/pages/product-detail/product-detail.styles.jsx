import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const Container = styled.div`
  margin: 20px auto;
  width: 1200px;
  h4 {
    margin: 16px 0;
    &.stretch {
      margin: 32px 0 16px;
    }
  }

  img {
    display: inline-block;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }

  .content-top {
    display: flex;

    .box-left {
      width: 30%;
      min-width: 360px;

      .container-image {
        display: flex;
        margin-top: 20px;
        min-width: 300px;
        overflow-x: scroll;
        overflow-y: hidden;
        height: 80px;
        white-space: nowrap;

        .small-image,
        div {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin-right: 7px;
        }

        div {
          background-color: rgba($color: #000000, $alpha: 0.1);
        }
      }

      .big-image {
        width: 100%;
        height: 400px;
      }
    }

    .box-right {
      padding: 0 35px;
      position: relative;

      .tag {
        height: 45px;
        width: 200px;
        border-radius: 5px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }

      button {
        background: none;
        border: 1px solid #000;
        padding: 5px 15px;
        cursor: pointer;
      }

      p {
        margin-bottom: 20px;
        width: 75%;
      }

      .options {
        display: flex;
        * + * {
          margin-left: 16px;
        }

        .row {
          display: flex;
          margin-right: 20px;

          .icon {
            margin-right: 5px;
          }
        }
        p {
          width: 100%;
        }
      }

      .options-2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        margin-top: 20px;

        .quantity {
          display: flex;
          min-width: 140px;
          justify-content: space-between;
          padding: 8px 14px;
          border-radius: 3px;
          background-color: rgba($color: #000000, $alpha: 0.1);

          span {
            letter-spacing: 1px;
            word-spacing: 2px;
            cursor: pointer;
          }

          div {
            span {
              padding: 5px;
            }
          }
        }

        .last {
          display: flex;
          width: 400px;

          button {
            width: 50%;
            outline: 0;
            border: 0;
            background-color: #2b74e4;
            color: #fff;
            padding: 10px 0;

            &:first-child {
              background-color: #45b1f4;
            }
          }
        }
      }
    }
  }

  .content-bottom {
    margin-top: 40px;
    display: flex;
    overflow: hidden;
    overflow-y: scroll;

    .card {
      height: auto;
      width: 250px;
      margin-right: 35px;

      .main-image {
        width: 250px;
        height: 250px;
      }

      .container-image {
        display: flex;
        margin-top: 12px;

        .small-image,
        div {
          margin-right: 5px;
          height: 50px;
          width: 50px;
        }
        div {
          border-radius: 5px;
          background-color: rgba($color: #000000, $alpha: 0.1);
        }
      }

      .card-infor {
        .h3 {
          margin-top: 14px;
          margin-bottom: 7px;
        }
      }
    }

    .card-2 {
      height: auto;
      width: 250px;
      margin-right: 35px;

      .main-image {
        width: 100%;
        height: 310px;
      }

      .h3 {
        margin-top: 14px;
        margin-bottom: 7px;
      }
    }
  }

  .shop-card {
    margin: 80px 0 32px;
  }
`;
