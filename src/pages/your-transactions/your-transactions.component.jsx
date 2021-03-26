import React from 'react';

import { Container } from './your-transactions.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Clock } from 'assets/clock.svg';
import ReceiveInvoice from '../receive-invoice/receive-invoice.component';

const YourTransaction = ({ name }) => {
  const { invoiceId } = useParams();

  return (
    <Container>
      <div className="content-left">
        <p>
          <b>Thông tin giao hàng</b>
        </p>
        <label for="">Tên người nhận</label>
        <input type="text" placeholder="Brian Nguyen" />
        <label for="">Địa chỉ</label>
        <input type="text" placeholder="H3 buidling ... HCMcity" />
        <label for="">Số điện thoại</label>
        <input type="text" name="" id="" placeholder="09123123123" />
        <button>Check out</button>
      </div>
      <ReceiveInvoice hideCheckout />
    </Container>
  );
};

export default YourTransaction;
