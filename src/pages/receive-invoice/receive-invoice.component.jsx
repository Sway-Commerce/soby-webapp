import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Container } from './receive-invoice.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Extra } from 'shared/assets/extra.svg';
import {
  ACCEPT_INVOICE,
  GET_DETAILED_INVOICE_BY_ID,
} from 'graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { timestampToDate } from 'shared/utils/getDate';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import InvoiceProductList from 'components/invoice-product-list/invoice-product-list.component';
import SobyModal from 'components/ui/modal/modal.component';
import ShippingInfo from 'components/shipping-info/shipping-info.component';

const ReceiveInvoice = ({ history, hideCheckout }) => {
  const { invoiceId } = useParams();
  const [open, setOpen] = useState(false);

  const { loading, error, data: invoiceData } = useQuery(
    GET_DETAILED_INVOICE_BY_ID,
    {
      variables: {
        id: invoiceId,
      },
    }
  );

  const [acceptInvoice, { data, error: acceptErrors }] = useMutation(
    ACCEPT_INVOICE,
    {
      errorPolicy: 'all',
    }
  );

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  if (!!acceptErrors) {
    acceptErrors?.graphQLErrors?.map((x) => {
      if (x?.extensions?.code === 401) {
        history.push(`/phone-signin/${invoiceId}`);
      }
      return null;
    });
  }

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
    // acceptInvoice({
    //   variables: {
    //     cmd: {
    //       invoiceId,
    //     },
    //   },
    // });

    setOpen(true);

    // if (!!localStorage.getItem('token')) {
    //   return;
    // }
    // history.push(`/phone-signin/invoice/${invoiceId}`);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="main-content">
          <div className="content-left">
            <div className="box-top">
              <div className="header-group">
                <div className="shop-name">
                  <img src={logoUrl} alt="" />
                  <p className="h2">{shopName}</p>
                </div>
                <Extra />
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
            {hideCheckout ? null : (
              <button onClick={handleNavigate}>Check out</button>
            )}
          </div>
        </div>
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        <ShippingInfo invoiceId={invoiceId} />
      </SobyModal>
    </React.Fragment>
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
