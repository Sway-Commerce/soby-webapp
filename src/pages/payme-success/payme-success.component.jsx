import React from 'react';
import {
  Container,
  CardWrapper,
  TransactionContainer
} from './payme-success.styles'
import PaymentSuccess from '../../shared/assets/Payment-Successful.svg'
import { Link } from 'react-router-dom';

const PaymeSuccess = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <CardWrapper>
        <TransactionContainer>
          <div className="soby-title">Confirm payment</div>
          <img className="photo" src={PaymentSuccess} />
        </TransactionContainer>
      </CardWrapper>
      <Link to="/your-transaction">
        <div className="back-btn">Back</div>
      </Link>
    </Container>
  )
};

export default PaymeSuccess;
