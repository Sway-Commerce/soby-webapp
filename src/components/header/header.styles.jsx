import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor } from '../../css-variable/variable';

export const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 240px;
  background-color: ${mainColor};
  @media screen and (max-width: 800px) {
    padding: 0 10px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 16.5px 0;
`;

export const OptionsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 40px;
  cursor: pointer;
  color: white;

`;

export const SignInLink = styled(Link)`
  padding: 10px 40px;
  cursor: pointer;
  color: white;
  font-weight: 600;

`;

export const CartContainer = styled(Link)`
  height: 44px;
  width: 44px;
  margin: 19px 0 17px 40px;
  background-color: white;
  display: flex;
  border-radius: 50%;
  svg {
    margin:auto 9px;
  }
`;

OptionLink.displayName = 'OptionLink';
