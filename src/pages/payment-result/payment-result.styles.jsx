import styled from 'styled-components';

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .soby-title {
    color: black;
    text-align: left;
    font-size: 40px;
    line-height: 49px;
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
  min-height: 735px;
  height: auto;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  button {
    margin-top: 56px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 210px 0;
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
          img, svg {
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
      #amount {
        font-size: 64px;
        line-height: 78px;
        flex: 2;
      }
      margin-bottom: 32px;
    }

    .pay-info {
      color: black;
      margin-top: 8px;
      text-align: right;
    }
  }
`;

export const InputGroup = styled.div`
  margin-top: 32px;
`;
