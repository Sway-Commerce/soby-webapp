import React from 'react';
import { Link } from 'react-router-dom';
import { RefundRequestStatus } from 'shared/constants/dispute.constant';
import { borderColor } from 'shared/css-variable/variable';
import styled from 'styled-components';

export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  background: #ffffff;

  .info-box {
    border: 1px solid ${borderColor};
    height: 100px;
    max-width: 370px;
    padding: 16px 24px;
    .invoice-info {
      color: #828282;
    }
  }
`;

const InvoiceInfoBox = ({ shopName, shippingLocation, trackingUrl }) => {
  return (
    <InfoBox>
      {shopName ? (
        <div className="info-box">
          <p>
            <b>Invoice from</b>
          </p>
          <p className="invoice-info">{shopName}</p>
        </div>
      ) : null}
      {shippingLocation ? (
        <div className="info-box">
          <p>
            <b>Shipping address</b>
          </p>
          <p className="invoice-info">
            {`${shippingLocation?.addressLine}, ${shippingLocation?.ward}, ${shippingLocation?.district}, ${shippingLocation?.province}`}
          </p>
        </div>
      ) : null}
      {trackingUrl ? (
        <div className="info-box">
          <p>
            <b>Tracking code</b>
          </p>
          <p className="invoice-info">{trackingUrl}</p>
        </div>
      ) : null}
    </InfoBox>
  );
};

export default InvoiceInfoBox;
