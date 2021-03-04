import React from 'react';

import {
  HomePageContainer,
  ImageContainer,
  CardContainer,
  Card,
} from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    <ImageContainer>
      <img src="/images/rectangle-1.png" alt="" />
      <img src="/images/rectangle-2.png" alt="" />
      <img src="/images/rectangle-3.png" alt="" />
    </ImageContainer>
    <CardContainer>
    <Card>
    </Card>
    </CardContainer>
  </HomePageContainer>
);

export default HomePage;
