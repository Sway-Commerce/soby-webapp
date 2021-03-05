import styled, { css } from 'styled-components';

const mainColor = '#2B74E4';

const buttonStyles = css`
  background-color: ${mainColor};
  color: white;
  border: 1px solid white;
  min-width: 350px;
  width: 100%;
  height: 56px;
  letter-spacing: 0.5px;
  text-transform: none;
  cursor: pointer;
  display: flex;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 4px;
`;

export const CustomButtonContainer = styled.button`
  justify-content: center;
  padding: 27px;
  ${buttonStyles}
`;

export const ButtonWithIcon = styled.div`
  justify-content: space-between;
  padding: 0 32px;
  ${buttonStyles}

  > * {
    margin: auto 0;
  }
`;
