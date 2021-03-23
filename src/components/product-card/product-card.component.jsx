import React from 'react';
import ImageGallery from '../carousel/carousel.component';

import { Container } from './product-card.styles';
import { currencyFormatter } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, imageUrls, currentPrice, description, isMain }) => {
  return (
    <Container>
      <div className="card" key={id}>
        {imageUrls.length > 1 ? (
          <ImageGallery imageUrls={imageUrls} isLarge={isMain} />
        ) : (
          <img src={imageUrls[0]} alt="" key={imageUrls[0]} className={`${isMain ? "main-image" : null}`} />
        )}

        {!isMain ? (
          <Link to={`/product/${id}`}>
            <div className="card-infor">
              <div className="h3">{currencyFormatter(currentPrice)}</div>
              <p>{description}</p>
            </div>
          </Link>
        ) : null}
      </div>
    </Container>
  );
};

export default ProductCard;
