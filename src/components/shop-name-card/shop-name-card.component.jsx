import React from 'react';

import { Container } from './shop-name-card.styles';

const ShopNameCard = ({ logoUrl, name }) => {
  return (
    <Container>
      <img src={logoUrl} alt="logo" />
      <div className="info">
        <h2 className="title">{name}</h2>
      </div>
    </Container>
  );
};

export default ShopNameCard;
