import React from 'react';
import KybStatus from '../kyb-status/kyb-status.component';

import { Container } from './kyb-card.styles';

const KybCard = ({ status, productView }) => (
  <Container className={`${productView ? 'product-view' : null}`}>
    <div className="title">
      <h4>Personal KYB</h4>
      <KybStatus status={status} />
    </div>
  </Container>
);

export default KybCard;
