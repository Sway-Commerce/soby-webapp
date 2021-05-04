import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

export const SignoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const SignoutTitle = styled.h1`
  margin: 10px 0;
  text-transform: capitalize;
  color: ${mainColor};
  padding-bottom: 10px;
`;

export const CardWrapper = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 80px 68px;
  width: 586px;
  min-height: 798px;
  height: auto;
  background-color: #ffffff;
`;

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 56px;
  form {
    width: 100%;
  }
`;

export const InputGroup = styled.div`
  margin-top: 32px;
`

export const ForgotPass = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.6rem;
  line-height: 15px;
  color: black;
  text-align: right;
  margin-top: 8px;
`;