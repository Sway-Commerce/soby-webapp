import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColor } from 'shared/css-variable/variable';

export const HeaderContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 calc((100vw - 1200px) / 2);
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

export const SignOut = styled.div`
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
    margin: auto 9px;
  }
`;

OptionLink.displayName = 'OptionLink';

export const SwitchBtn = styled.button`
  padding: 0.5rem 1.2rem;
  color: white;
  font-size: 0.7rem;
  border: 1px white solid;
  background-color: ${mainColor};
  border-radius: 5rem;
`;

export const IconBtn = styled(Link)`
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: ${mainColor};
  border: none;
  display: flex;
  align-items: center;
  svg + span,
  span + svg {
    margin-left: 8px;
  }
`;

export const UserContainer = styled(Link)`
  color: white;
  padding: 0.5rem 0 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: ${mainColor};
  border: none;
  display: flex;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 0.8rem;
  }
`;
