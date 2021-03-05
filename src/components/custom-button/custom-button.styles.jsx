import styled, { css } from 'styled-components';

const mainColor = '#2B74E4';
const colorWhite = '#FFFFFF';

const buttonStyles = css`
  background-color: ${mainColor};
  color: ${colorWhite};
  border: none;

  &:hover {
    background-color: ${colorWhite};
    color: ${mainColor};
    border: 1px solid ${mainColor};
  }
`;

const invertedButtonStyles = css`
  background-color: ${colorWhite};
  color: ${mainColor};
  border: 1px solid ${mainColor};

  &:hover {
    background-color: ${mainColor};
    color: ${colorWhite};
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: ${colorWhite};

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: 100%;
  height: 56px;
  letter-spacing: 0.5px;
  text-transform: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 4px;
  padding: 27px;

  ${getButtonStyles}
`;
