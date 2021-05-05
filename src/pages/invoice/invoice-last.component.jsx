import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { Container, InvoiceButton, Row, ShippingCard } from './invoice.styles';
import { useParams } from 'react-router-dom';
import { ReactComponent as Extra } from 'shared/assets/extra.svg';
import {
  ACCEPT_INVOICE,
  GET_DETAILED_INVOICE_BY_ID,
  GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL,
  MARK_SATISFIED_WITH_INVOICE,
  REQUEST_INVOICE_REFUND,
  UPDATE_RETURN_SHIPPING_INFO,
} from 'graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { timestampToDate } from 'shared/utils/getDate';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import InvoiceProductList from 'components/invoice-product-list/invoice-product-list.component';
import SobyModal from 'components/ui/modal/modal.component';
import ShippingInfo from 'components/shipping-info/shipping-info.component';
import InvoiceStatus from 'components/invoice-status/invoice-status.component';
import Accordion from 'components/ui/accordion/accordion.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

const InvoiceLast = ({ invoiceIndividualId }) => {
  const { invoiceId } = useParams();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [shopData, setShopData] = useState({
    name: '',
    shippingType: '',
    expiredAt: '',
    price: '',
    items: [],
    shop: { logoUrl: '', name: '' },
    status: '',
    shippingFee: 0,
    shippingLocation: {
      addressLine: '',
      district: '',
      province: '',
      ward: '',
    },
    individualTrackingUrl: '',
    totalPrice: '',
    orderFee: '',
    escrowFee: '',
  });
  const [productMargin, setProductMargin] = useState(0);
  const [formError, setFormError] = useState('');

  const [
    loadDetailInvoice,
    { loading, data: invoiceData, error: loadDetailInvoiceError },
  ] = useLazyQuery(GET_DETAILED_INVOICE_BY_ID, {
    variables: {
      id: invoiceId,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const [
    getAggregatedInvoiceOrderForIndividual,
    {
      loading: getAggregatedInvoiceOrderForIndividualLoading,
      error: getAggregatedInvoiceOrderForIndividualError,
      data: getAggregatedInvoiceOrderForIndividualData,
    },
  ] = useLazyQuery(GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL, {
    variables: {
      id: invoiceIndividualId,
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
    if (invoiceIndividualId) {
      getAggregatedInvoiceOrderForIndividual();
    }
  }, [invoiceIndividualId]);

  useEffect(() => {
    if (invoiceData?.getAggregatedInvoice?.data) {
      const {
        name,
        shippingType,
        expiredAt,
        price,
        items,
        shop,
      } = invoiceData?.getAggregatedInvoice?.data;
      setShopData({ name, shippingType, expiredAt, price, items, shop });
    }
  }, [invoiceData?.getAggregatedInvoice?.data]);

  useEffect(() => {
    const invoiceData =
      getAggregatedInvoiceOrderForIndividualData
        ?.getAggregatedInvoiceOrderForIndividual?.data;
    if (invoiceData) {
      const {
        status,
        shippingFee,
        shippingLocation,
        individualTrackingUrl,
        totalPrice,
        orderFee,
      } = invoiceData;
      const {
        name,
        shippingType,
        expiredAt,
        price,
        items,
        shop,
        escrowFee,
      } = invoiceData?.invoice;
      setShopData({
        name,
        shippingType,
        expiredAt,
        price,
        items,
        shop,
        status,
        shippingFee,
        shippingLocation,
        individualTrackingUrl,
        totalPrice,
        orderFee,
        escrowFee,
      });
    }
  }, [
    getAggregatedInvoiceOrderForIndividualData
      ?.getAggregatedInvoiceOrderForIndividual?.data,
  ]);

  useEffect(() => {
    if (acceptInvoiceData?.acceptInvoice?.data) {
      setOpen(true);
    }
  }, [acceptInvoiceData?.acceptInvoice?.data]);

  // MARK_SATISFIED_WITH_INVOICE
  const [
    markSatisfiedWithInvoice,
    {
      data: markSatisfiedWithInvoiceData,
      loading: markSatisfiedWithInvoiceLoading,
      error: markSatisfiedWithInvoiceError,
    },
  ] = useMutation(MARK_SATISFIED_WITH_INVOICE, {
    errorPolicy: 'all',
    variables: {
      cmd: {
        invoiceIndividualId,
      },
    },
  });

  useEffect(() => {
    if (markSatisfiedWithInvoiceData?.markSatisfiedWithInvoice?.success) {
    }
  }, [markSatisfiedWithInvoiceData?.markSatisfiedWithInvoice?.success]);

  // UPDATE_RETURN_SHIPPING_INFO
  const [
    updateReturnShippingInfo,
    {
      data: updateReturnShippingInfoData,
      loading: updateReturnShippingInfoLoading,
      error: updateReturnShippingInfoError,
    },
  ] = useMutation(UPDATE_RETURN_SHIPPING_INFO, {
    errorPolicy: 'all',
    variables: {
      cmd: {
        assessId: '',
        shippingType: '', //BY_USER BY_SOBY
        shippingLocationId: '',
        returnFeePaidBy: '', //INDIVIDUAL SHOP
        bankCode: '', // ABBANK
        accountType: '', // ATM_CARD BANK_ACCOUNT
        accountNumber: '',
        accountOwner: '',
        accountIssuedOn: '',
        bankBranch: '',
      },
    },
  });

  // Error handle
  useEffect(() => {
    if (
      markSatisfiedWithInvoiceError?.message ||
      loadDetailInvoiceError?.message ||
      getAggregatedInvoiceOrderForIndividualError?.message ||
      acceptInvoiceError?.message ||
      updateReturnShippingInfoError?.message
    ) {
      setFormError(
        markSatisfiedWithInvoiceError?.message ??
          loadDetailInvoiceError?.message ??
          getAggregatedInvoiceOrderForIndividualError?.message ??
          acceptInvoiceError?.message ??
          updateReturnShippingInfoError?.message
      );
    }
  }, [
    markSatisfiedWithInvoiceError?.message,
    loadDetailInvoiceError?.message,
    getAggregatedInvoiceOrderForIndividualError?.message,
    acceptInvoiceError?.message,
    updateReturnShippingInfoError?.message,
  ]);

  const handleCheckout = () => {
    invoiceIndividualId ? setOpen(true) : acceptInvoice();
  };

  return loading ||
    acceptLoading ||
    getAggregatedInvoiceOrderForIndividualLoading ||
    updateReturnShippingInfoLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        <div className="main-content">
          <div className="content-left">
            <div className="box-top">
              <div className="header-group">
                <div className="shop-name">
                  <img src={shopData.shop.logoUrl} alt="" />
                  <p className="h2">{shopData.shop.name}</p>
                </div>
                <Extra />
              </div>

              <p>
                <b>{shopData.name}</b>
              </p>

              {
                // Status
              }
              {shopData.status ? (
                <div className="item-wrapper">
                  <p>Status</p>
                  <InvoiceStatus status={shopData.status} />
                </div>
              ) : null}

              {
                // Expriration date
              }
              {shopData.status === 'ACCEPTED' || !shopData.status ? (
                <React.Fragment>
                  <div className="item-wrapper">
                    <p>Expriration date</p>
                    <p>{timestampToDate(shopData.expiredAt)}</p>
                  </div>
                  <div className="item-wrapper">
                    <p className="auto-fit">Shipping option</p>
                    <div>
                      <div className="option-chip">
                        {shopData.shippingType === 'BY_SOBY'
                          ? 'Soby ship'
                          : 'Seller ship'}
                      </div>
                    </div>
                  </div>

                  {
                    // Payment info
                  }
                  <div className="box-tag">
                    <Accordion
                      title="Payment details"
                      setBelowGap={setProductMargin}
                    >
                      <div className="payinfo-wrapper">
                        <p>Subtotal</p>
                        <p>
                          {currencyFormatter(
                            invoiceIndividualId ? shopData.price : 0
                          )}
                        </p>
                      </div>
                      <div className="payinfo-wrapper">
                        <p>Order Fee</p>
                        <p>{currencyFormatter(shopData.orderFee)}</p>
                      </div>
                      <div className="payinfo-wrapper">
                        <p>Shipping Fee</p>
                        <p>{currencyFormatter(shopData.shippingFee)}</p>
                      </div>
                    </Accordion>
                    <div className="payinfo-wrapper total">
                      <h4>Total</h4>
                      <h4>
                        {currencyFormatter(
                          invoiceIndividualId
                            ? shopData.totalPrice
                            : shopData.price
                        )}
                      </h4>
                    </div>
                  </div>
                </React.Fragment>
              ) : null}

              {
                // Payment info
              }
              {shopData.status !== 'ACCEPTED' && shopData.status ? (
                <React.Fragment>
                  <div className="accordion-wrapper">
                    <Accordion title="Payment details">
                      <div className="payinfo-wrapper">
                        <p>Subtotal</p>
                        <p>{currencyFormatter(shopData.price)}</p>
                      </div>
                      <div className="payinfo-wrapper">
                        <p>Escrow Fee</p>
                        <p>{currencyFormatter(shopData.escrowFee)}</p>
                      </div>
                      <div className="payinfo-wrapper">
                        <p>Order Fee</p>
                        <p>{currencyFormatter(shopData.orderFee)}</p>
                      </div>
                      <div className="payinfo-wrapper">
                        <p>Shipping Fee</p>
                        <p>{currencyFormatter(shopData.shippingFee)}</p>
                      </div>
                    </Accordion>
                    <div className="payinfo-wrapper total">
                      <h4>Total</h4>
                      <h4>{currencyFormatter(shopData.totalPrice)}</h4>
                    </div>
                  </div>
                  <ShippingCard>
                    <div className="shipping-wrapper">
                      <p>Shipping option</p>
                      <div>
                        <div className="option-chip">
                          {shopData.shippingType === 'BY_SOBY'
                            ? 'Soby ship'
                            : 'Seller ship'}
                        </div>
                      </div>
                    </div>
                    {shopData.shippingLocation?.addressLine ? (
                      <p className="text-truncation shipping-location">{//`${shopData?.shippingLocation?.addressLine}, ${shopData?.shippingLocation?.ward}, ${shopData?.shippingLocation?.district}, ${shopData?.shippingLocation?.province}`
                      }</p>
                    ) : null}
                    {shopData?.individualTrackingUrl ? (
                      <div className="shipping-wrapper">
                        <p className="tracking-code text-truncation">
                          {shopData.individualTrackingUrl}
                        </p>
                        <div
                          className="method"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              shopData.individualTrackingUrl
                            );
                            window.alert('Shipping tracking url is copied');
                          }}
                        >
                          Copy
                        </div>
                      </div>
                    ) : null}
                  </ShippingCard>
                </React.Fragment>
              ) : null}
            </div>
            <div
              style={{
                marginTop: `${productMargin}`,
                paddingTop: `${
                  shopData.status === 'ACCEPTED' || !shopData.status
                    ? '40px'
                    : 0
                }`,
              }}
            >
              <InvoiceProductList items={shopData.items} />
            </div>
            {shopData.status === 'ACCEPTED' || !shopData.status ? (
              <div className="check-out" onClick={handleCheckout}>
                <div>Check out</div>
                <div className="price">
                  <b>{currencyFormatter(shopData.price)}</b>
                </div>
              </div>
            ) : null}

            {shopData.status === 'DELIVERED' ? (
              <Row>
                <InvoiceButton>Return</InvoiceButton>
                <InvoiceButton accept>Accept</InvoiceButton>
              </Row>
            ) : null}
          </div>
        </div>
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {acceptInvoiceData?.acceptInvoice?.data?.id || invoiceIndividualId ? (
          <ShippingInfo
            invoiceIndividualId={
              acceptInvoiceData?.acceptInvoice?.data?.id ?? invoiceIndividualId
            }
          />
        ) : null}
      </SobyModal>

      <SobyModal open={openError} setOpen={setOpenError}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpenError} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default InvoiceLast;
