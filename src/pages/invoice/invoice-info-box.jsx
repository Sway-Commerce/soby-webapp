import React from 'react';
import { borderColor } from 'shared/css-variable/variable';
import styled from 'styled-components';

export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 360px);
  grid-gap: 30px;
  background: #ffffff;

  .info-box {
    border: 1px solid ${borderColor};
    height: 100px;
    max-width: 370px;
    padding: 16px 24px;
    .invoice-info {
      color: #828282;
      word-break: break-word;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-content: center;
    .info-box {
      max-width: 100%;
    }
  }
`;

const InvoiceInfoBox = ({ shopName, shippingLocation, trackingUrl }) => {
  return (
    <InfoBox>
      {shopName ? (
        <div className="info-box">
          <h5>Invoice from</h5>
          <p className="invoice-info">{shopName}</p>
        </div>
      ) : null}
      {shippingLocation ? (
        <div className="info-box">
          <h5>Shipping address</h5>

          <p className="invoice-info">
            {`${shippingLocation?.addressLine}, ${shippingLocation?.ward}, ${shippingLocation?.district}, ${shippingLocation?.province}`}
          </p>
        </div>
      ) : null}
      {trackingUrl ? (
        <div className="info-box">
          <h5>Tracking code</h5>
          <p className="invoice-info">{trackingUrl}</p>
        </div>
      ) : null}
    </InfoBox>
  );
};

export default InvoiceInfoBox;
