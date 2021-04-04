import React from 'react';
import {
  TransactionContainer,
  CardWrapper,
  Container,
  FormContainer,
} from './payment-result.styles';
import PaymentStatus from 'components/payment-status/payment-status.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import { timestampToDate } from 'shared/utils/getDate';

import { ReactComponent as MasterCard } from 'shared/assets/master-card.svg';
import { ReactComponent as VisaCard } from 'shared/assets/visa-card.svg';
import { getBankLogo } from 'shared/utils/getBankLogo';
import Spinner from 'components/ui/spinner/spinner.component';
import { Link } from 'react-router-dom';

const PaymentResult = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const vnp_BankCode = params.get('vnp_BankCode');
  const vnp_BankTranNo = params.get('vnp_BankTranNo');
  const vnp_CardType = params.get('vnp_CardType');
  const vnp_OrderInfo = params.get('vnp_OrderInfo');
  const vnp_PayDate = timestampToDate(+params.get('vnp_PayDate'));
  const vnp_ResponseCode = params.get('vnp_ResponseCode');
  const vnp_Amount = currencyFormatter(+params.get('vnp_Amount') / 100);

  if (
    !vnp_BankCode ||
    !vnp_BankTranNo ||
    !vnp_CardType ||
    !vnp_OrderInfo ||
    !vnp_PayDate ||
    !vnp_ResponseCode ||
    !vnp_Amount
  ) {
    return <Spinner />;
  }

  const imgUrl = getBankLogo(vnp_BankCode);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <CardWrapper>
        <TransactionContainer>
          <div className="soby-title">Confirm payment</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="amount-info">
                <div id="amount">{vnp_Amount}</div>
                <div>
                  <div className="pay-info">Pay date</div>
                  <div className="pay-info">{vnp_PayDate}</div>
                </div>
              </div>

              <PaymentStatus code={vnp_ResponseCode} />

              <div id="description">
                <div className="second-col">
                  <div className="title">Bank code</div>
                  <div className="info">
                    <img src={imgUrl} alt="bank-logo"></img>
                  </div>
                </div>
                <div className="second-col">
                  <div className="title">Card type</div>
                  <div className="info">
                    {vnp_CardType.toLocaleLowerCase() === 'visa' ? (
                      <VisaCard />
                    ) : (
                      <MasterCard />
                    )}
                  </div>
                </div>
                <div className="second-col">
                  <div className="title">Bank transaction numbers</div>
                  <div className="info">{vnp_BankTranNo}</div>
                </div>
                <div className="second-col">
                  <div className="title">VNPay information</div>
                  <div className="info">{vnp_OrderInfo}</div>
                </div>
              </div>
            </form>
          </FormContainer>
        </TransactionContainer>
      </CardWrapper>
      <Link to="/your-transaction">
        <div className="back-btn">Back</div>
      </Link>
    </Container>
  );
};

export default PaymentResult;
