import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from './checkout.styles';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

import Dropdown from 'components/ui/dropdown/dropdown.component';
import { BANK_LIST } from 'shared/constants/bank.constant';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

import { sortObject } from 'shared/utils/sortObject';
import QueryString from 'qs';
import sha256 from 'sha256';
import { useMutation } from '@apollo/client';
import { UPDATE_INVOICE_INDIVIDUAL_INFO } from 'graphQL/repository/invoice.repository';

const Checkout = () => {
  const { invoiceId } = useParams();

  const [bankCode, setBankCode] = useState('NCB');

  const { vnp_ReturnUrl, vnp_SecureHash, vnp_TmnCode, vnpUrl } = useSelector(
    (state) => {
      return {
        vnp_TmnCode: state.transaction.vnpTmnCode,
        vnp_SecureHash: state.transaction.vnpHashSecret,
        vnpUrl: state.transaction.vnpUrl,
        vnp_ReturnUrl: state.transaction.vnpReturnUrl,
      };
    }
  );

  const bankList = BANK_LIST;
  const date = new Date();
  const createDate = dateFormat(date, 'yyyymmddHHmmss');
  const orderId = dateFormat(date, 'HHmmss');

  let vnp_params = {
    vnp_Version: '2',
    vnp_Command: 'pay',
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: 'Thanh toán thời gian thực',
    vnp_OrderType: 'billpayment',
    vnp_Amount: 1000000,
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpAddr: '%3A%3A1',
    vnp_CreateDate: createDate,
    vnp_BankCode: bankCode,
  };

  vnp_params = sortObject(vnp_params);

  const signData =
    vnp_SecureHash + QueryString.stringify(vnp_params, { encode: false });

  let secureHash = sha256(signData);

  vnp_params = {
    ...vnp_params,
    vnp_SecureHashType: 'SHA256',
    vnp_SecureHash: secureHash,
  };

  const vnpay_site =
    vnpUrl + '?' + QueryString.stringify(vnp_params, { encode: true });

  const [updateInvoiceIndividualInfo, { data, error }] = useMutation(
    UPDATE_INVOICE_INDIVIDUAL_INFO,
    {
      errorPolicy: 'all',
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // window.location.assign(`http://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=${vnpUrl}&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh%20toan%20don%20hang%20thoi%20gian%3A%202021-03-28%2022%3A03%3A08&vnp_OrderType=billpayment&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Ftransaction%2Fvnpay_return&vnp_TmnCode=H2AM4RHG&vnp_TxnRef=220337&vnp_Version=2&vnp_SecureHashType=SHA256&vnp_SecureHash=6bddec2e4d41fc425960aa839ab137c34b570429b8d6df197b63db08132a4025`);
    // window.location.assign(vnpay_site);
    updateInvoiceIndividualInfo({
      variables: {
        cmd: {
          shippingLocationId: 'd5cad2df-201a-4ef9-b8ab-4fd09114a4b3',
          invoiceIndividualId: '1d3491cc-8e61-41c0-a618-be80774291e3',
          paymentMethod: 'CREDIT',
        },
      },
    });

    // http://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_Command=pay&
    // vnp_CreateDate=20210328220321&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&
    // vnp_OrderInfo=Thanh%20toan%20don%20hang%20thoi%20gian%3A%202021-03-28%2022%3A03%3A16&
    // vnp_OrderType=billpayment&
    // vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Ftransaction%2Fvnpay_return&
    // vnp_TmnCode=H2AM4RHG&vnp_TxnRef=220321&vnp_Version=2&
    // vnp_SecureHashType=SHA256&
    // vnp_SecureHash=2652e8759a42246a245615ea0620ffc4f6bf980aa936e0547c9d60d3510a1147
  };

  return (
    <Container>
      <div className="box-left">
        <p className="title">
          <b>Thanh toán</b>
        </p>
        <div className="select-wrapper"></div>
        <button onClick={handleSubmit}>Thanh toán</button>
      </div>
      <ReceiveInvoice hideCheckout />
    </Container>
  );
};

export default Checkout;
