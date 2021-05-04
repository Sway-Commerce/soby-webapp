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

export const CardWrapper = styled.div`
  transition: 0.3s;
  padding: 100px 50px;
  width: 700px;
  height: 735px;
  height: auto;
  margin: auto;
  border-radius: 3px;

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

  div.mobile-back {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    span {
      cursor: pointer;
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
        font-size: 3.2rem;
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
