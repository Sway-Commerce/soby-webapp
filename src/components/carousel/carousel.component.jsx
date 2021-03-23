import React from 'react';

import { Container } from './carousel.styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ImageGallery = ({ imageUrls = [] }) => {
  return (
    <Container>
      <div className="card">
        <Carousel showArrows={false} showStatus={false} showIndicators={false}>
          {imageUrls.map((x) => (
            <img src={x} alt="" key={x} />
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default ImageGallery;
