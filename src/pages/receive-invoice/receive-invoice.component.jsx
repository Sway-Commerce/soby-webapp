import React from 'react';

import { Container } from './receive-invoice.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Clock } from 'assets/clock.svg';
import { useQuery } from '@apollo/client';
import { GET_DETAILED_INVOICE_BY_ID } from 'graphQL/repository/invoice.repository';
import Spinner from 'components/spinner/spinner.component';
import { GET_SHOP_BY_ID } from 'graphQL/repository/shop.repository';
import { timestampToDate } from 'utils/getDate';
import { currencyFormatter } from 'utils/formatCurrency';

const ReceiveInvoice = ({}) => {
  const { invoiceId } = useParams();
  let invoiceShopId = null;

  const { loading, error, data: invoiceData } = useQuery(
    GET_DETAILED_INVOICE_BY_ID,
    {
      variables: {
        id: invoiceId,
      },
    }
  );

  if (invoiceData?.getAggregatedInvoice?.data) {
    const { shopId } = invoiceData?.getAggregatedInvoice?.data;
    invoiceShopId = shopId;
  }

  const { loading: shopLoading, error: shopError, data: shopData } = useQuery(
    GET_SHOP_BY_ID,
    {
      variables: { id: invoiceShopId },
    }
  );

  if (loading || shopLoading) return <Spinner />;
  if (error || shopError) return `Error! ${error}`;

  const {
    name,
    shippingType,
    expiredAt,
    price,
    items,
  } = invoiceData?.getAggregatedInvoice?.data;
  const shopInfo = shopData?.getShopById?.data;

  console.log(invoiceData);

  return (
    <Container>
      <div className="main-content">
        <div className="content-left">
          <div className="box-top">
            <div className="header-group">
              <div className="shop-name">
                <img src={shopInfo.logoUrl} alt="" />
                <p className="h2">{shopInfo.name}</p>
              </div>
            </div>

            <p>
              <b>{name}</b>
            </p>
            <div className="item-wrapper">
              <p>Expriration date</p>
              <p>{timestampToDate(expiredAt)}</p>
            </div>
            <div className="item-wrapper">
              <p>Status</p>
              <div className="status">
                <Clock />
                <p>Waiting</p>
              </div>
            </div>
            <div className="item-wrapper">
              <p>Hình thức giao hàng</p>
              <div className="status">
                <p>{shippingType}</p>
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

          <div className="box-bottom">
            {items.map((x) => {
              const {
                product: {
                  name,
                  price,
                  id,
                  imageUrls: [imageUrl],
                },
              } = x;
              console.log(imageUrl);
              return (
                <div className="item-row" key={id}>
                  <img src={imageUrl} alt="" />
                  <div className="info">
                    <p>{name}</p>
                    <p>{currencyFormatter(price)}</p>
                  </div>
                  <p>Qty - {x.quantity}</p>
                </div>
              );
            })}
          </div>

          <button>Check out</button>
        </div>
      </div>
    </Container>
  );
};

export default ReceiveInvoice;
