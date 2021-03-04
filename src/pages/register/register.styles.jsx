import styled from 'styled-components';

const mainColor = '#2B74E4';

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

export const ControlTitle = styled.h3`
  color: ${mainColor};
  margin: 20px 0 10px 0;
`;

export const Gap = styled.div`
  margin-bottom: 20px;
`;

export const ErrorTitle = styled.h5`
  color: red;
  margin: 5px 0;
`;

export const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 16px;
  max-width: 544px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 100px 90px 0;
`;
