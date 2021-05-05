import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { timestampToDate } from '../../shared/utils/getDate';
import { mainColor, borderColor } from '../../shared/css-variable/variable';
import { currencyFormatter } from '../../shared/utils/formatCurrency';

const Container = styled(Link)`
  grid-template-columns: 463px 176px 176px 176px 158px;
  display: grid;
  height: 48px;
  margin-bottom: 14px;
  border-bottom: 1px solid ${borderColor};
  :last-child {
    border: none;
  }
`;

const Status = styled.p`
  text-transform: capitalize;
  color: ${mainColor};
  text-align: right;
`;

const InvoiceItem = ({
  price,
  status = "",
  name,
  updatedAt,
  id,
  setActiveInvoice,
  activeInvoice,
}) => {
  return (
    <Container
      onClick={() => setActiveInvoice(id)}
      className={`${activeInvoice === id ? 'active' : ''}`}
      to={`invoice/${id}`}
    >
      <p>{name}</p>
      <p>{timestampToDate(updatedAt)}</p>
      <p>{currencyFormatter(price)}</p>
      <p>Blue Bird Shop</p>
      <Status>{status.toLocaleLowerCase()}</Status>
    </Container>
  );
};

export default InvoiceItem;
