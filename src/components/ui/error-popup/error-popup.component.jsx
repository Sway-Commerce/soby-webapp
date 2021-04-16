import React from 'react';
import styled from 'styled-components';
import { mainColor } from '../../../shared/css-variable/variable';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 500px;
`;

export const Body = styled.div`
  padding: 20px;
  flex: 1;
  font-size: 1rem;
  color: #f53535;
  display: grid;
  place-items: center;
`;
export const CloseButton = styled.button`
  width: calc(100% - 40px);
  color: ${mainColor};
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #f1f1f1;
  border: 0;
  outline: 0;
  padding: 14px 0;
  margin-top: 40px;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(196, 196, 196, 0.2);
  margin: 20px;
  z-index: 1000;
`;
export const Header = styled.div`
  height: 70px;
  background-color: #f53535;
  color: white;
  display: grid;
  place-items: center;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

const ErrorPopup = ({ content, setOpen }) => {
  return (
    <React.Fragment>
      <Container>
        <Header>Error</Header>
        <Body>{content}</Body>
        <CloseButton onClick={() => setOpen(false)}>Close</CloseButton>
      </Container>
    </React.Fragment>
  );
};
export default ErrorPopup;
