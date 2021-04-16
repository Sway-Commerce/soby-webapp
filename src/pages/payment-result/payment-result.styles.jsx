import styled from 'styled-components';

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .soby-title {
    color: black;
    text-align: left;
    font-size: 2rem;
    line-height: 49px;
  }

  @media screen and (max-width: 800px) {
    .soby-title {
      font-size: 1rem;
      line-height: 24px;
    }
  }
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

export const CardWrapper = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 100px 50px;
  width: 700px;
  height: 735px;
  height: auto;
  margin: auto;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  button {
    margin-top: 56px;
  }

  @media screen and (max-width: 800px) {
    font-size: 0.7rem;
    width: 376px;
    min-height: 393px;
    padding: 48px 24px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 40px 0;
  a {
    display: flex;
    div.back-btn {
      margin: auto;
      margin-top: 85px;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  form {
    width: 100%;

    #description {
      margin-top: 49px;
      .second-col {
        .title {
          text-align: left;
        }

        .info {
          text-align: right;
          img,
          svg {
            height: 24px;
          }
        }
      }

      .second-col + .second-col {
        margin-top: 32px;
      }
    }

    .amount-info {
      display: flex;
      justify-content: space-between;
      #amount {
        font-weight: bold;
        font-size: 64px;
        line-height: 78px;
      }
      margin-bottom: 32px;
    }

    .pay-info {
      color: black;
      margin-top: 8px;
      text-align: right;
    }
  }

  @media screen and (max-width: 800px) {
    font-size: 0.7rem;
    margin-top: 8px;
    form {
      .amount-info {
        justify-content: space-between;

        #amount {
          font-size: 1.6rem;
          line-height: 39px;
        }
        margin-bottom: 16px;
      }

      .pay-info {
        margin-top: 0;
        line-height: 17px;
      }

      #description {
        margin-top: 19px;

        .second-col {
          display: flex;
          justify-content: space-between;
        }

        .second-col + .second-col {
          margin-top: 16px;
        }
      }
    }
  }
`;

export const InputGroup = styled.div`
  margin-top: 32px;
`;
