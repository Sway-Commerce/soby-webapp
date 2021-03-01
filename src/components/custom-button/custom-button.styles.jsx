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

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: 100%;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: none;
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 8px;

  ${getButtonStyles}
`;
