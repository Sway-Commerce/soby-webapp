import React from 'react';
import ImageGallery from '../ui/carousel/carousel.component';
import styled from 'styled-components';

import { currencyFormatter } from 'shared/utils/formatCurrency';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 170px;
  .card {
    img {
      width: 170px;
      height: 229px;
      object-fit: cover;

      &.main-image {
        width: 170px;
        height: 325px;
      }
    }
  }
`;

const ImageItem = styled.img`
  width: 170px;
  height: ${(props) => (props.isMain ? '229px' : '325px')};
  object-fit: cover;
`;

const Price = styled.h3`
  line-height: 28px;
`;

const Name = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const ProductCard = ({ id, imageUrls, currentPrice, name, isMain }) => {
  return (
    <Container>
      <React.Fragment key={id}>
        {imageUrls.length > 1 ? (
          <ImageGallery imageUrls={imageUrls} isLarge={isMain} />
        ) : (
          <ImageItem src={imageUrls[0]} key={imageUrls[0]} isMain />
        )}

        {!isMain ? (
          <Link to={`/product/${id}`}>
            <Price>{currencyFormatter(currentPrice)}</Price>
            <Name className="text-truncation-second-line">{name}</Name>
          </Link>
        ) : null}
      </React.Fragment>
    </Container>
  );
};

export default ProductCard;
