import React from 'react';

import { Container } from './receive-invoice.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Clock } from '../../assets/clock.svg';

const ReceiveInvoice = ({ name }) => {
  const { invoiceId } = useParams();

  return (
    <Container>
      <div className="main-content">
        <div className="content-left">
          <div className="box-top">
            <div className="header-group">
              <div className="shop-name">
                <img src="/images/rectangle-1.png" alt="" />
                <p className="h2">Shop name</p>
              </div>
            </div>

            <p>
              <b>invoice name</b>
            </p>
            <div className="item-wrapper">
              <p>Expriration date</p>
              <p>dd/mm/yyyy</p>
            </div>
            <div className="item-wrapper">
              <p>Status</p>
              <div className="status">
                <Clock />
                <p>Waiting</p>
              </div>
            </div>

            <div className="box-tag">
              <div>Check out</div>
              <div className="last"></div>
              <div>
                <b>240,000 vnd</b>
              </div>
            </div>

            <div className="circle"></div>
          </div>

          <div className="box-bottom">
            <div className="item-row">
              <div className="image"></div>
              <div className="info">
                <p>Super awesome product name</p>
                <p>120,000 vnđ</p>
              </div>
              <p>Qty - 01</p>
            </div>
            <div className="item-row">
              <div className="image"></div>
              <div className="info">
                <p>Super awesome product name</p>
                <p>120,000 vnđ</p>
              </div>
              <p>Qty - 01</p>
            </div>
            <div className="item-row">
              <div className="image"></div>
              <div className="info">
                <p>Super awesome product name</p>
                <p>120,000 vnđ</p>
              </div>
              <p>Qty - 01</p>
            </div>
            <div className="item-row">
              <div className="image"></div>
              <div className="info">
                <p>Super awesome product name</p>
                <p>120,000 vnđ</p>
              </div>
              <p>Qty - 01</p>
            </div>
          </div>

          <button>Check out</button>
        </div>
      </div>
    </Container>
  );
};

export default ReceiveInvoice;
