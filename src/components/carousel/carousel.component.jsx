import React from 'react';

import { Container } from './carousel.styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageGallery = ({}) => {
  return (
    <Container>
      <div class="card">
        <Carousel showArrows={false} showStatus={false} showIndicators={false}>
          <img src="/images/item2.jpg" alt="" />
          <img src="/images/rectangle-1.png" alt="" />
          <img src="/images/item.jpg" alt="" />
        </Carousel>
      </div>
    </Container>
  );
};

export default ImageGallery;
