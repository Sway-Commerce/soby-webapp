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

const PaymentResult = () => {
  const url = new URL(
    'https://soby.vn/transaction/%7Bid?vnp_Amount=10200000&vnp_BankCode=NCB&vnp_BankTranNo=20210309145628&vnp_CardType=ATM&vnp_OrderInfo=Payment+on+Soby&vnp_PayDate=20210309145612&vnp_ResponseCode=00&vnp_TmnCode=SOBY0001&vnp_TransactionNo=13471791&vnp_TxnRef=f1b48c72-0e49-4310-b0d1-2493bf750269&vnp_SecureHashType=SHA256&vnp_SecureHash=89b73a4002f88b280d71fa24f3ab1e96922223f5be99a22a90dbc9dd14cbe0a4'
  );
  const params = new URLSearchParams(url.search);
  const vnp_BankCode = params.get('vnp_BankCode');
  const vnp_BankTranNo = params.get('vnp_BankTranNo');
  const vnp_CardType = params.get('vnp_CardType');
  const vnp_OrderInfo = params.get('vnp_OrderInfo');
  const vnp_PayDate = timestampToDate(+params.get('vnp_PayDate'));
  const vnp_ResponseCode = params.get('vnp_ResponseCode');
  const vnp_Amount = currencyFormatter(+params.get('vnp_Amount'));

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

              <PaymentStatus code={vnp_ResponseCode}/>

              <div id="description">
                <div className="second-col">
                  <div className="title">Bank code</div>
                  <div className="info">
                    <img
                      src={imgUrl}
                      alt="bank-logo"
                    ></img>
                  </div>
                </div>
                <div className="second-col">
                  <div className="title">Card type</div>
                  <div className="info">{vnp_CardType.toLocaleLowerCase() === "visa" ? <VisaCard/> : <MasterCard/> }</div>
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
      <div className="back-btn">Back</div>
    </Container>
  );
};

export default PaymentResult;
