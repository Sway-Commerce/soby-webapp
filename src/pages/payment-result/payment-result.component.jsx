import React from 'react';

const PaymentResult = () => {
  const url = new URL(
    'https://soby.vn/transaction/%7Bid?vnp_Amount=102000000&vnp_BankCode=NCB&vnp_BankTranNo=20210309145628&vnp_CardType=ATM&vnp_OrderInfo=Payment+on+Soby&vnp_PayDate=20210309145612&vnp_ResponseCode=00&vnp_TmnCode=SOBY0001&vnp_TransactionNo=13471791&vnp_TxnRef=f1b48c72-0e49-4310-b0d1-2493bf750269&vnp_SecureHashType=SHA256&vnp_SecureHash=89b73a4002f88b280d71fa24f3ab1e96922223f5be99a22a90dbc9dd14cbe0a4'
  );
  const params = new URLSearchParams(url.search);
  const vnp_BankCode = params.get('vnp_BankCode');
  const vnp_BankTranNo = params.get('vnp_BankTranNo');
  const vnp_CardType = params.get('vnp_CardType');
  const vnp_OrderInfo = params.get('vnp_OrderInfo');
  const vnp_PayDate = params.get('vnp_PayDate');
  const vnp_ResponseCode = params.get('vnp_ResponseCode');
  const vnp_Amount = params.get('vnp_Amount');
  console.log({
    url,
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
  });
  return <div>Payment result work</div>;
};

export default PaymentResult;
