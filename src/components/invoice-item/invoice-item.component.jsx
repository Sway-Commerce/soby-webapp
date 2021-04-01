import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as BillIcon } from 'shared/assets/bill-icon.svg';
import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';
import { currencyFormatter } from 'shared/utils/formatCurrency';

export const Container = styled.div`
  display: flex;
  margin-top: 32px;
  cursor: pointer;

  &.active {
    background: #f1f1f1;
  }

  .icon-container {
    width: 83px;
    height: 78px;
    background: #f1f1f1;
    border-radius: 5px;
    display: flex;
    svg {
      width: 35px;
      height: 35px;
      margin: auto;
    }
  }

  .detail-wrapper {
    margin-left: 40px;
    border-bottom: 1px solid rgb(112, 112, 112, 0.5);
    min-width: 532px;
    display: flex;
    .details-order {
      flex: 1;
      .cost {
        font-family: Work Sans;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        color: #000000;
        margin-top: 8px;
      }

      .sort {
        font-family: Work Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 26px;
        color: #000000;
      }
    }

    .details-status {
      display: flex;
      .order-image {
        height: 20px;
        margin: auto 8px;
      }
      .order-status {
        margin: auto 0;
      }
    }
  }
`;

const InvoiceItem = ({
  price,
  status,
  name,
  id,
  setActiveInvoice,
  activeInvoice,
}) => {
  return (
    <Container
      onClick={() => setActiveInvoice(id)}
      className={`${activeInvoice === id ? 'active' : ''}`}
    >
      <div className="icon-container">
        <BillIcon />
      </div>
      <div className="detail-wrapper">
        <div className="details-order">
          <p className="sort">{name}</p>
          <p className="cost">{currencyFormatter(price)}</p>
        </div>
        <div className="details-status">
          <ClockIcon className="order-image" />
          <p className="order-status">{status}</p>
        </div>
      </div>
    </Container>
  );
};

export default InvoiceItem;
