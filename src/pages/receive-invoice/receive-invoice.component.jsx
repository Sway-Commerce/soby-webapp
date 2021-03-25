import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Container } from './receive-invoice.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Extra } from 'assets/extra.svg';
import {
  ACCEPT_INVOICE,
  GET_DETAILED_INVOICE_BY_ID,
} from 'graphQL/repository/invoice.repository';
import Spinner from 'components/spinner/spinner.component';
import { timestampToDate } from 'utils/getDate';
import { currencyFormatter } from 'utils/formatCurrency';
import InvoiceProductList from 'components/invoice-product-list/invoice-product-list.component';

const ReceiveInvoice = ({ history }) => {
  const { invoiceId } = useParams();

  const { loading, error, data: invoiceData } = useQuery(
    GET_DETAILED_INVOICE_BY_ID,
    {
      variables: {
        id: invoiceId,
      },
    }
  );

  const [acceptInvoice, { data, error: acceptError }] = useMutation(
    ACCEPT_INVOICE,
    {
      errorPolicy: 'all',
    }
  );

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const {
    name,
    shippingType,
    expiredAt,
    price,
    items,
    shop,
  } = invoiceData?.getAggregatedInvoice?.data;
  const { logoUrl, name: shopName } = shop;

  const handleNavigate = () => {
    if (!!localStorage.getItem('token')) {
      return;
    }
    history.push(`/phone-signin/invoice/${invoiceId}`);
  };

  return (
    <Container>
      <div className="main-content">
        <div className="content-left">
          <div className="box-top">
            <div className="header-group">
              <div className="shop-name">
                <img src={logoUrl} alt="" />
                <p className="h2">{shopName}</p>
              </div>
              <Extra/>
            </div>

            <p>
              <b>{name}</b>
            </p>
            <div className="item-wrapper">
              <p>Expriration date</p>
              <p>{timestampToDate(expiredAt)}</p>
            </div>

            <div className="item-wrapper">
              <p className="auto-fit">Hình thức giao hàng</p>
              <div>
                <div className="option-chip">
                  {shippingType === 'BY_SOBY' ? 'Soby ship' : 'Seller ship'}
                </div>
              </div>
            </div>

            <div className="box-tag">
              <div>Check out</div>
              <div className="last"></div>
              <div>
                <b>{currencyFormatter(price)}</b>
              </div>
            </div>

            <div className="circle"></div>
          </div>

          <InvoiceProductList items={items} />

          <button onClick={handleNavigate}>Check out</button>
        </div>
      </div>
    </Container>
  );
};

export default ReceiveInvoice;

// <div className="item-wrapper">
//               <p>Status</p>
//               <div className="status">
//                 <Clock />
//                 <p>Waiting</p>
//               </div>
//             </div>

// () =>
// acceptInvoice({
//   variables: {
//     cmd: {
//       invoiceId,
//     },
//   },
// }
