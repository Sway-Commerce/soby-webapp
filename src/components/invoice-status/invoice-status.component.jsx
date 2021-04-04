import React, { useState } from 'react';
import {
  subInvoiceFilters,
  subInvoiceIcons,
} from 'shared/constants/invoice.constant';
import styled from 'styled-components';

export const Container = styled.div`
  .tab-status {
    display: flex;
    cursor: pointer;
    svg {
      margin: auto 8px auto 0px;
    }
    .status {
      font-family: Work Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 26px;
      color: #000000;
    }
  }
`;

const InvoiceStatus = ({ status }) => {
  const index =
    subInvoiceFilters?.findIndex((x) => x.toUpperCase() === status) ?? 0;

  return (
    <Container>
      <div className="tab-status">
        {subInvoiceIcons[index]}
        <p className="status">{subInvoiceFilters[index]}</p>
      </div>
    </Container>
  );
};

export default InvoiceStatus;
