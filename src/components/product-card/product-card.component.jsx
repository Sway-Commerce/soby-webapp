import React from 'react';
import ImageGallery from '../carousel/carousel.component';

import { Container } from './product-card.styles';
import { currencyFormatter } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, imageUrls, currentPrice, description }) => {
  return (
    <Container>
      <div className="card" key={id}>
        <ImageGallery imageUrls={imageUrls} />
        <Link to={`/product/${id}`}>
          <div className="card-infor">
            <div className="h3">{currencyFormatter(currentPrice)}</div>
            <p>{description}</p>
          </div>
        </Link>
      </div>
    </Container>
  );
};

export default ProductCard;
