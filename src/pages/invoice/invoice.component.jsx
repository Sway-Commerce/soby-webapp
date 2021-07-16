import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'shared/assets/close-action.svg';
import { ReactComponent as AcceptIcon } from 'shared/assets/accept-action.svg';
import {
  bodyColor,
  borderColor,
  greenColor,
} from 'shared/css-variable/variable';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  ACCEPT_INVOICE,
  GET_DETAILED_INVOICE_BY_ID,
  MARK_SATISFIED_WITH_INVOICE,
  UPDATE_RETURN_SHIPPING_INFO,
} from 'graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import RequestItem from 'pages/return-request-list/request-item.component';
import { DisputeType } from 'shared/constants/dispute.constant';
import InvoiceInfoBox from 'pages/invoice/invoice-info-box';
import { ReactComponent as CheckIcon } from 'shared/assets/check.svg';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 26px;
  background-color: #ffffff;
  margin-top: 38px;
`;

const Box = styled.div`
  background-color: #fff;
  text-align: left;

  &.main-box {
    display: flex;
    justify-content: space-between;
    height: 100px;
  }

  .row {
    display: flex;
    margin-top: 20px;
  }

  .sub {
    margin-top: 5px;
    font-size: 14px;
    color: ${(prop) => prop.theme.stoke};
  }
  .bold {
    font-weight: 600;
    margin-top: 5px;
  }

  .phone {
    width: 100%;
    padding: 7px 0;
    border-radius: 0;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr 1fr 1fr;

  :first-child,
  :last-child {
    border-bottom: 1px solid ${borderColor};
  }

  .last-child {
    justify-self: right;
    flex: 1;
  }

  h3 {
    text-align: left;
  }

  .title-info {
    min-height: 60px;
    display: flex;
    align-items: center;
  }
`;

const Product = styled.div`
  display: flex;
  text-align: left;

  div {
    margin-left: 15px;
    padding: 5px;

    p {
      &:last-child {
        margin-top: 5px;
        font-size: 14px;
        color: ${(prop) => prop.theme.stoke};
      }
    }
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  position: relative;
  top: -15px;

  .action {
    display: flex;
    flex-direction: column;

    p {
      text-align: center;
    }

    & + .action {
      margin-left: 40px;
    }
  }
`;

export const FooterBox = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr 1fr;
`;

const BreakLine = styled.hr`
  border-top: 1px solid ${borderColor};
  margin-bottom: 24px;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-row-gap: 24px;
`;

const AcceptButton = styled.div`
  width: 255.89px;
  height: 48px;
  background: ${greenColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  * + * {
    margin-left: 10px;
  }
`;

const ReportButton = styled.div`
  width: 255.89px;
  height: 48px;
  border: 1px solid ${bodyColor};
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${bodyColor};
  border-radius: 6px;
  cursor: pointer;
  margin-top: 16px;
  * + * {
    margin-left: 10px;
  }
`;

const Invoice = () => {
  const { invoiceId } = useParams();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    name: '',
    price: '',
    items: [],
    shop: { logoUrl: '', name: '' },
    orderFee: '',
    escrowFee: '',
    createdAt: '',
    id: ''
  });
  const [productMargin, setProductMargin] = useState(0);
  const [formError, setFormError] = useState('');
  const { shop } = invoiceData;

  const [loadDetailInvoice, { 
    loading: loadDetailInvoiceLoading, 
    error: loadDetailInvoiceError,
    data: loadDetailInvoiceData }] =
    useLazyQuery(GET_DETAILED_INVOICE_BY_ID, {
      variables: {
        id: invoiceId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    });

  const [
    acceptInvoice,
    {
      data: acceptInvoiceData,
      loading: acceptLoading,
      error: acceptInvoiceError,
    },
  ] = useMutation(ACCEPT_INVOICE, {
    errorPolicy: 'all',
    variables: {
      cmd: {
        invoiceId,
      },
    },
  });

  useEffect(() => {
    if (invoiceId) {
      loadDetailInvoice();
    }
  }, [invoiceId]);

  useEffect(() => {
    if (invoiceData?.getAggregatedInvoice?.data) {
      const { name, shippingType, price, items, shop } =
        invoiceData?.getAggregatedInvoice?.data;
      setInvoiceData({ name, shippingType, price, items, shop });
    }
  }, [invoiceData?.getAggregatedInvoice?.data]);

  useEffect(() => {
    const invoiceData =
    loadDetailInvoiceData?.getAggregatedInvoice?.data;
    if (invoiceData) {
      const {
        name, shop, escrowFee, items, price
      } = invoiceData;
      setInvoiceData({
        name,
        price,
        items,
        shop,
        escrowFee
      });
    }
  }, [
    loadDetailInvoiceData?.getAggregatedInvoice?.data,
  ]);

  useEffect(() => {
    if (acceptInvoiceData?.acceptInvoice?.data) {
      setOpen(true);
    }
  }, [acceptInvoiceData?.acceptInvoice?.data]);

  // Error handle
  useEffect(() => {
    if (
      loadDetailInvoiceError?.message ||
      acceptInvoiceError?.message
    ) {
      setFormError(
          loadDetailInvoiceError?.message ??
          acceptInvoiceError?.message
      );
    }
  }, [
    loadDetailInvoiceError?.message,
    acceptInvoiceError?.message,
  ]);

  return acceptLoading ||
    loadDetailInvoiceLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Page>
        <Box className="main-box">
          <div>
            <h2>{invoiceData.name}</h2>
          </div>
        </Box>

        <InvoiceInfoBox
          shopName={shop.name}
        />

        <Grid>
          <h5 className="title-info">Products list</h5>
          <h5 className="title-info">Subtotal</h5>
          <h5 className="title-info">Qty</h5>
        </Grid>
        <BreakLine />

        <ProductContainer>
          {invoiceData.items.map((x) => {
            const {
              id: itemId,
              price: totalPrice,
              product: {
                name: productName,
                imageUrls: [imageUrl],
              },
              sku: { currentPrice },
              quantity: productQuantity,
            } = x;
            return (
              <Grid key={itemId}>
                <Product className="title-info">
                  <img src={imageUrl} alt="" />
                  <div>
                    <p>{productName}</p>
                    <p>{shop.name}</p>
                  </div>
                </Product>
                <p className="title-info">{currencyFormatter(currentPrice)}</p>
                <p className="title-info">{productQuantity}</p>
                <p className="title-info last-child">
                  {currencyFormatter(totalPrice)}
                </p>
              </Grid>
            );
          })}
        </ProductContainer>
        <BreakLine />
        <FooterBox>
          <div></div>
          <p>Subtotal</p>
          <p className="text-right">{currencyFormatter(invoiceData.price)}</p>
        </FooterBox>
        <FooterBox>
          <div></div>
          <p>Safebuy fee</p>
          <p className="text-right">
            {currencyFormatter(invoiceData.escrowFee)}
          </p>
        </FooterBox>
      </Page>

      <SobyModal open={openError} setOpen={setOpenError}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpenError} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default Invoice;
