import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 101px 240px;
`;

export const ImageContainer = styled.div`
  display: flex;
  img + img {
    margin-left: 24px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const Card = styled.div`
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  padding: 0 68px;
  width: 586px;
  height: 797px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  button + button {
    margin-top: 24px;
  }
`;

export const ForgotPass = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: black;
  text-align: right;
  margin-top: 8px;
`;

export const ButtonGroup = styled.div`
  a + a div {
    margin-top: 24px;
  }
`;

export const CenterLogo = styled.div`
  svg {
    margin: 56px auto;
    display: flex;
  }
`;
