import React from 'react';
import ImageGallery from '../carousel/carousel.component';

import { Container } from './product-listcard.styles';

const ProductListCard = ({}) => (
  <Container>
    <div class="content-bottom">
      <div class="card">
        <ImageGallery />
        <div class="card-infor">
          <div class="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
        </div>
      </div>

      <div class="card-2">
        <img src="/images/rectangle-1.png" alt="" class="main-image" />

        <div class="card-infor">
          <div class="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
        </div>
      </div>

      <div class="card">
        <ImageGallery />
        <div class="card-infor">
          <div class="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet dwqd dwqdhkj.</p>
        </div>
      </div>

      <div class="card-2">
        <img src="/images/rectangle-1.png" alt="" class="main-image" />

        <div class="card-infor">
          <div class="h3">1,120,000 vnd</div>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum dolor..</p>
        </div>
      </div>
    </div>
  </Container>
);

export default ProductListCard;
