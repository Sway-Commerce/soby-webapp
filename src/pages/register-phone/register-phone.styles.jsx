import styled from 'styled-components';

import { mainColor } from '../../css-variable/variable';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const SignUpTitle = styled.h1`
  margin: 10px 0;
  text-transform: capitalize;
  color: ${mainColor};
  padding-bottom: 10px;
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

export const CardWrapper = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 80px 68px;
  width: 586px;
  height: 580px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  button {
    margin-top: 56px;
  }
`;

export const RegisterContainer = styled.div`
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
  }
`;