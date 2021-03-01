import styled from 'styled-components';

const mainColor = '#2B74E4';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 544px;
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

