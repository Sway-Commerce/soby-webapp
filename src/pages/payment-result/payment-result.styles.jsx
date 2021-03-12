import styled from 'styled-components';
import { mainColor } from '../../css-variable/variable';

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

export const CardWrapper = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 80px 68px;
  width: 700px;
  min-height: 700px;
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
  margin-top: 56px;
  form {
    width: 100%;
    .second-col {
      .form-label {
        text-align: right;
      }
      .info {
        padding-top: 7px;
      }
    }

  }
`;

export const InputGroup = styled.div`
  margin-top: 32px;
`
