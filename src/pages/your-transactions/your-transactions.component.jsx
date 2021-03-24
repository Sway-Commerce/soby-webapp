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
        <div className="h2">Hình thức giao hàng</div>
        <div className="option col">
          <div className="checkbox">
            <input type="checkbox" id="cb1" />
            <label for="cb1">
              <span>Soby Ship - free~50,000 vnd</span>
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="cb2" />
            <label for="cb2">
              <span>Seller Ship - 100,000~150,000 vnd</span>
            </label>
          </div>
        </div>
        <div className="h2">Hình thức thanh toán</div>
        <div className="option row">
          <div className="checkbox">
            <input type="checkbox" id="cb3" />
            <label for="cb3">
              <span>COD</span>
            </label>
          </div>
          <div className="checkbox">
            <input type="checkbox" id="cb4" />
            <label for="cb4">
              <span>VNPAY</span>
            </label>
          </div>
        </div>

        <div className="h2">Thông tin giao hàng</div>
        <label for="">Tên người nhận</label>
        <input type="text" placeholder="Brian Nguyen" />
        <label for="">Địa chỉ</label>
        <input type="text" placeholder="H3 buidling ... HCMcity" />
        <label for="">Số điện thoại</label>
        <input type="text" name="" id="" placeholder="09123123123" />
        <button>Check out</button>
      </div>
      <ReceiveInvoice />
    </Container>
  );
};

export default YourTransaction;
