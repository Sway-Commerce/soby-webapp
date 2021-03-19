import React from 'react';
import ImageGallery from '../carousel/carousel.component';

import { Container } from './product-listcard.styles';

const ProductListCard = ({}) => (
  <Container>
    <div className="content-bottom">
      <div className="card">
        <ImageGallery />
        <div className="card-infor">
          <div className="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
        </div>
      </div>

      <div className="card-2">
        <img src="/images/rectangle-1.png" alt="" className="main-image" />

        <div className="card-infor">
          <div className="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
        </div>
      </div>

      <div className="card">
        <ImageGallery />
        <div className="card-infor">
          <div className="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
        </div>
      </div>

      <div className="card-2">
        <img src="/images/rectangle-1.png" alt="" className="main-image" />

        <div className="card-infor">
          <div className="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
        </div>
      </div>
    </div>
  </Container>
);

export default ProductListCard;
