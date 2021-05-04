import styled from 'styled-components';
import { mainColor } from 'shared/css-variable/variable';

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

export const CardWrapper = styled.div`
  transition: 0.3s;
  padding: 56px 40px 40px;
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
  form {
    width: 100%;
  }
`;

export const CodeText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 0.7rem;
  line-height: 24px;
  margin: 16px 0 24px;
  display: flex;
`;

export const SendAgain = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 24px;
  cursor: pointer;
  margin-left: 8px;
  color: ${mainColor};
`
export const SubText = styled.div`
  margin: 40px 0 24px;
  display: grid;
  place-content: center;
  p {
    line-height: 24px;
    text-align: center;
  }
`