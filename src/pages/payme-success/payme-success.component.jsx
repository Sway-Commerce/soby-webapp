import React from 'react';
import {
  Container,
  CardWrapper,
  TransactionContainer
} from './payme-success.styles'

const PaymeSuccess = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <CardWrapper>
        <TransactionContainer>
          <div className="soby-title">Confirm payment</div>
        </TransactionContainer>
      </CardWrapper>
      <div className="mobile-back">
        <span
          onClick={() =>
            (window.location = 'http://soby.vn/transaction/payme-success-redirect')
          }
        >
          Back
        </span>
      </div>
    </Container>
  )
};

export default PaymeSuccess;
