import React from 'react';

import { Container } from './shop-name-card.styles';
import {Link} from 'react-router-dom';

const ShopNameCard = ({ logoUrl, name, productView, id }) => {
  return (
    <Link to={`/shop-profile/${id}`}>
      <Container className={`${productView ? 'product-view' : null}`}>
        <img src={logoUrl} alt="logo" />
        <div className="info">
          <h2 className="title">{name}</h2>
        </div>
      </Container>
    </Link>
  );
};

export default ShopNameCard;
