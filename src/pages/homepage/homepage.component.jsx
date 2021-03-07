import React from 'react';
import { Link } from 'react-router-dom';

import {
  HomePageContainer,
  ImageContainer,
  CardContainer,
  Card,
  ForgotPass,
  ButtonGroup,
  CenterLogo,
} from './homepage.styles';
import CustomButton from '../../components/custom-button/custom-button.component';
import { ReactComponent as Temp } from '../../assets/temp.svg';
import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Mail } from '../../assets/mail.svg';
import PolicyNavigate from '../../components/policy-navigate/policy-navigate.component';

const HomePage = () => (
  <HomePageContainer>
    <ImageContainer>
      <img src="/images/rectangle-1.png" alt="" />
      <img src="/images/rectangle-2.png" alt="" />
      <img src="/images/rectangle-3.png" alt="" />
    </ImageContainer>
    <CardContainer>
      <Card>
        <div className="soby-title">Welcome to Soby</div>
        <CenterLogo>
          <Temp></Temp>
        </CenterLogo>

        <ButtonGroup>
          <Link to="/email-signin">
            <CustomButton withIcon>
              <div>Đăng nhập Email</div>
              <Mail />
            </CustomButton>
          </Link>
          <Link to="/phone-signin">
            <CustomButton withIcon>
              <div>Đăng nhập Số điện thoại</div>
              <Phone />
            </CustomButton>
          </Link>
        </ButtonGroup>

        <ForgotPass>
          <Link to="/resetpass">Forgot your Password</Link>
        </ForgotPass>
        <PolicyNavigate />
      </Card>
    </CardContainer>
  </HomePageContainer>
);

export default HomePage;
