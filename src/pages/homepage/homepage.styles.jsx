import styled from 'styled-components';

const mainColor = '#2B74E4';

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

  svg {
    margin: 56px auto;
    display: flex;
  }

  button + button {
    margin-top: 24px;
  }
`;

export const SobyTitle = styled.div`
  font-family: 'Paytone One', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 56px;
  color: ${mainColor};
  text-align: center;
  margin-top: 80px;
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

export const SignUpText = styled.div`
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  color: black;
  text-align: center;
  margin-top: 56px;
  span {
    font-weight: 600;
  }
`;

export const VerifyText = styled.div`
  font-style: normal;
  font-size: 11px;
  font-weight: 400;
  line-height: 20px;
  color: black;
  text-align: center;
  margin-top: 8px;
  span {
    font-weight: 600;
    color: ${mainColor}
  }
`;
