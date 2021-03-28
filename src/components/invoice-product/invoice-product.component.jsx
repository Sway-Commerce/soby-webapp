import React from 'react';

import { Container } from './invoice-product.styles';
import { currencyFormatter } from 'shared/utils/formatCurrency';

const InvoiceProduct = ({ imageUrl, name, price, quantity, properties }) => (
  <Container>
    <img src={imageUrl} alt="" />
    <div className="info">
      <p>{name}</p>
      <span className="fs-16">{currencyFormatter(price)}</span>
      {properties.map((x) => {
        if (x.name !== 'WEIGHT') {
          return (
            <span key={x.value}>
              <span> - {x.name}: </span>
              <span>{x.value}</span>
            </span>
          );
        }
        return null;
      })}
    </div>
    <p>Qty - {quantity}</p>
  </Container>
);

export default InvoiceProduct;
