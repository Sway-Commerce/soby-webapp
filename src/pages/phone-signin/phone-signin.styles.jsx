import styled from 'styled-components';

export const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const CardWrapper = styled.div`
  transition: 0.3s;
  padding: 56px 40px 40px;
  height: auto;
  background: #ffffff;
  border-radius: 3px;
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
  margin-top: 24px;
`;
