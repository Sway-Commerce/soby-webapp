import React from 'react';
import { Link } from 'react-router-dom';

import {
  HomePageContainer,
  ImageContainer,
  CardContainer,
  Card,
  SobyTitle,
  ForgotPass,
  SignUpText,
  VerifyText,
  ButtonGroup,
  CenterLogo,
} from './homepage.styles';
import CustomButton from '../../components/custom-button/custom-button.component';
import { ReactComponent as Temp } from '../../assets/temp.svg';
import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Mail } from '../../assets/mail.svg';

const HomePage = () => (
  <HomePageContainer>
    <ImageContainer>
      <img src="/images/rectangle-1.png" alt="" />
      <img src="/images/rectangle-2.png" alt="" />
      <img src="/images/rectangle-3.png" alt="" />
    </ImageContainer>
    <CardContainer>
      <Card>
        <SobyTitle>Welcome to Soby</SobyTitle>
        <CenterLogo>
          <Temp></Temp>
        </CenterLogo>

        <ButtonGroup>
          <CustomButton withIcon>
            <div>Đăng nhập Email</div>
            <Mail />
          </CustomButton>
          <CustomButton withIcon>
            <div>Đăng nhập Số điện thoại</div>
            <Phone />
          </CustomButton>
        </ButtonGroup>

        <ForgotPass>
          <Link to="/resetpass">Forgot your Password</Link>
        </ForgotPass>

        <SignUpText>
          Do not have account?
          <Link to="/signup">
            <span>&#32;Sign up here</span>
          </Link>
        </SignUpText>
        <VerifyText>By logging in or registering, I agree to SOBY</VerifyText>
        <VerifyText style={{ marginTop: 0 }}>
          <Link to="/terms">
            <span>Terms of Service&#32;</span>
          </Link>
          and
          <Link to="/privacy">
            <span>&#32;Privacy Policy.</span>
          </Link>
        </VerifyText>
      </Card>
    </CardContainer>
  </HomePageContainer>
);

export default HomePage;
