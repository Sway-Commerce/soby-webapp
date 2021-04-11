import React from 'react';
import styled from 'styled-components';

import ProductCard from '../product-card/product-card.component';

export const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(4, 1fr);
`;

const ProductListCard = ({ records = [] }) => {
  return (
    <Container>
      {records.map((x) => {
        let sku = {};
        if (x.skus.length) {
          sku = x.skus[x.skus.length - 1];
        }
        return (
          <ProductCard
            key={x.id}
            id={x.id}
            imageUrls={x.imageUrls}
            currentPrice={sku?.currentPrice}
            name={x.name}
          />
        );
      })}
    </Container>
  );
};

export default ProductListCard;
