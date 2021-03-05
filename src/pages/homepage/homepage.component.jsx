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
} from './homepage.styles';
import { ReactComponent as Temp } from '../../assets/temp.svg';
import CustomButton from '../../components/custom-button/custom-button.component';

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
        <Temp></Temp>
        <CustomButton>Đăng nhập Email</CustomButton>
        <CustomButton>Đăng nhập Số điện thoại</CustomButton>
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
