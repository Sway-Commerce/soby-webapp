import React from 'react';
import {
  Container,
  CardWrapper,
  TransactionContainer
} from './payme-fail.styles';
import PaymentFail from '../../shared/assets/Payment-fail.svg'
import { Link } from 'react-router-dom';

const PaymeFail = () => {
  return (
    <Container>
      <CardWrapper>
        <TransactionContainer>
          <div className="soby-title">Payment fail</div>
          <img className="photo" src={PaymentFail} />
        </TransactionContainer>
      </CardWrapper>
      <Link to="/your-transaction">
        <div className="back-btn">Back</div>
      </Link>
    </Container>
  )
};

export default PaymeFail;
