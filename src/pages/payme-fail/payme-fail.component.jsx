import React from 'react';
import {
  Container,
  CardWrapper,
  TransactionContainer
} from './payme-fail.styles';

const PaymeFail = () => {
  return (
    <Container>
      <CardWrapper>
        <TransactionContainer>
          <div className="soby-title">Payment fail</div>
        </TransactionContainer>
      </CardWrapper>
      <div className="mobile-back">
        <span
          onClick={() =>
            (window.location = 'http://soby.vn/your-transaction')
          }
        >
          Back
        </span>
      </div>
    </Container>
  )
};

export default PaymeFail;
