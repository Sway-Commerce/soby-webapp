import React from 'react';

import { Container } from './invoice-product-list.styles';
import InvoiceProduct from 'components/invoice-product/invoice-product.component';

const InvoiceProductList = ({ items }) => (
  <Container>
    {items.map((x) => {
      const {
        product: {
          name,
          id,
          imageUrls: [imageUrl],
        },
        sku: { properties, currentPrice },
      } = x;
      return (
        <InvoiceProduct
          imageUrl={imageUrl}
          key={id + Math.random()}
          price={currentPrice}
          quantity={x.quantity}
          name={name}
          properties={properties}
        />
      );
    })}
  </Container>
);

export default InvoiceProductList;
