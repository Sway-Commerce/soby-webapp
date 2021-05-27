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
  width: 440px;
  @media screen and (max-width: 500px) {
    width: calc(100vw - 49px);
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  form {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  margin-top: 1.2rem;
`;

export const NameContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;
