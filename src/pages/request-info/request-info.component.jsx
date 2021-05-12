import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'shared/assets/close-action.svg';
import { ReactComponent as CheckIcon } from 'shared/assets/check.svg';
import { ReactComponent as CheckShippingIcon } from 'shared/assets/check-shipping.svg';
import {
  borderColor,
  greenColor,
  mainColor,
} from 'shared/css-variable/variable';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  ACCEPT_INVOICE,
  GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL,
  GET_DETAILED_INVOICE_BY_ID,
  MARK_SATISFIED_WITH_INVOICE,
  UPDATE_RETURN_SHIPPING_INFO,
} from 'graphQL/repository/invoice.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import RequestItem from 'pages/return-request-list/request-item.component';
import { RefundRequestStatus } from 'shared/constants/dispute.constant';
import { GET_AGGREGATED_ASSESS_FOR_INDIVIDUAL } from 'graphQL/repository/dispute.repository';
import { stokeColor } from 'shared/css-variable/variable';
import InvoiceInfoBox from 'pages/invoice/invoice-info-box';
import { GET_INDIVIDUAL_SHIPPING_LOCATION_LIST } from 'graphQL/repository/shipping.repository';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import Checkbox from 'components/ui/checkbox/checkbox.component';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px 24px;
  background-color: #ffffff;
  margin-top: 38px;

  .submit-action {
    display: flex;
    justify-content: center;
    button {
      width: 475px;
    }
  }
`;

const Box = styled.div`
  background-color: #fff;
  text-align: left;

  &.main-box {
    display: flex;
    justify-content: space-between;
    height: 100px;
    h4 {
      margin-top: 4px;
    }
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

  :first-child {
    padding-top: 24px;
    border-top: 1px solid ${stokeColor};
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
  :first-child {
    margin-top: 24px;
    border-top: 1px solid ${borderColor};
  }
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

const RefundImage = styled.img`
  width: 100px;
  height: 100px;
`;

const RefundImageContainer = styled.div`
  * + * {
    margin-left: 24px;
  }
`;

const DetailBox = styled.div`
  margin-top: 24px;
`;

const ShippingBox = styled.div`
  margin: 16px 0;
  height: 69px;
  border: 1px solid #e4e4e4;
  padding: 8px;
  width: 100%;
  cursor: pointer;

  .main-content {
    display: flex;
    align-items: center;
    * {
      margin: auto 0;
      font-weight: 700;
    }

    svg {
      margin-right: 8px;
    }
  }
`;

const ShippingContainer = styled.div`
  margin: 48px 0 24px;
`;

const RequestInfo = () => {
  const { assessId, requestId } = useParams();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [accessData, setAccessData] = useState({});
  const [refundRequest, setRefundRequest] = useState(null);
  const [shop, setShop] = useState(null);
  const [formError, setFormError] = useState('');
  const [shippingLocationList, setShippingLocationList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [canShowAction, setCanShowAction] = useState(true);
  const [shippingFeePayBy, setShippingFeePayBy] = useState('SHOP');

  const [
    getAggregatedAssessForIndividual,
    {
      loading: getAggregatedAssessForIndividualLoading,
      error: getAggregatedAssessForIndividualError,
      data: getAggregatedAssessForIndividualData,
    },
  ] = useLazyQuery(GET_AGGREGATED_ASSESS_FOR_INDIVIDUAL, {
    variables: {
      id: assessId,
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
        invoiceId: assessId,
      },
    },
  });

  useEffect(() => {
    if (assessId) {
      getAggregatedAssessForIndividual();
    }
  }, [assessId]);

  useEffect(() => {
    const assessData =
      getAggregatedAssessForIndividualData?.getAggregatedAssessForIndividual
        ?.data;
    if (assessData) {
      const { refundRequests, shop } = assessData;
      setAccessData(assessData);
      setRefundRequest(refundRequests?.find((x) => x.id === requestId));
      setCanShowAction(
        refundRequests?.findIndex((x) => x.id === requestId) === 0
      );

      setShop(shop);
    }
  }, [
    getAggregatedAssessForIndividualData?.getAggregatedAssessForIndividual
      ?.data,
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
        invoiceId: assessId,
      },
    },
  });
  useEffect(() => {
    if (markSatisfiedWithInvoiceData?.markSatisfiedWithInvoice?.success) {
    }
  }, [markSatisfiedWithInvoiceData?.markSatisfiedWithInvoice?.success]);

  const {
    data: getIndividualShippingLocationListData,
    error: getIndividualShippingLocationListError,
    loading: getIndividualShippingLocationListLoading,
  } = useQuery(GET_INDIVIDUAL_SHIPPING_LOCATION_LIST);

  useEffect(() => {
    const shippingList =
      getIndividualShippingLocationListData?.getIndividualShippingLocationList
        ?.data;
    if (shippingList) {
      setShippingLocationList(shippingList);

      const selectedLocation = shippingList?.find((x) => x.defaultLocation);

      console.log(selectedLocation?.id);
      setSelectedLocation(selectedLocation?.id);
    }
  }, [
    getIndividualShippingLocationListData?.getIndividualShippingLocationList
      ?.data,
  ]);

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
  });

  const handleCheckChange = (event) => {
    if (!event) {
      return;
    }
    setShippingFeePayBy(
      shippingFeePayBy === 'INDIVIDUAL' ? 'SHOP' : 'INDIVIDUAL'
    );
  };

  useEffect(() => {
    if (updateReturnShippingInfoData?.updateReturnShippingInfo?.data) {
      window.location = 'return-request';
    }
  }, [updateReturnShippingInfoData?.updateReturnShippingInfo?.data]);

  // Error handle
  useEffect(() => {
    if (
      markSatisfiedWithInvoiceError?.message ||
      getAggregatedAssessForIndividualError?.message ||
      acceptInvoiceError?.message ||
      updateReturnShippingInfoError?.message ||
      getIndividualShippingLocationListError?.message
    ) {
      setFormError(
        markSatisfiedWithInvoiceError?.message ??
          getAggregatedAssessForIndividualError?.message ??
          acceptInvoiceError?.message ??
          updateReturnShippingInfoError?.message ??
          getIndividualShippingLocationListError?.message
      );
    }
  }, [
    markSatisfiedWithInvoiceError?.message,
    getAggregatedAssessForIndividualError?.message,
    acceptInvoiceError?.message,
    updateReturnShippingInfoError?.message,
    getIndividualShippingLocationListError?.message,
  ]);

  const updateReturnShipping = () => {
    updateReturnShippingInfo({
      variables: {
        cmd: {
          assessId: accessData?.id,
          shippingType: 'BY_USER',
          shippingLocationId: selectedLocation,
          returnFeePaidBy: shippingFeePayBy,
          bankCode: null,
          accountType: null,
          accountNumber: null,
          accountOwner: null,
          accountIssuedOn: null,
          bankBranch: null,
        },
      },
    });
  };

  const handleCheckout = () => {
    assessId ? setOpen(true) : acceptInvoice();
  };

  return acceptLoading ||
    getAggregatedAssessForIndividualLoading ||
    updateReturnShippingInfoLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Page>
        <Box className="main-box">
          <div>
            <h2>Return Request {requestId}</h2>
            <h4
              className={RefundRequestStatus[refundRequest?.status]?.colorClass}
            >
              {RefundRequestStatus[refundRequest?.status]?.name}
            </h4>
          </div>

          {
            //   refundRequest?.status === 'ACCEPTED' ? (
            //   <ActionContainer>
            //     <AcceptButton>
            //       <CheckIcon />
            //       <span>Accept</span>
            //     </AcceptButton>
            //   </ActionContainer>
            // ) : null
          }
        </Box>

        {refundRequest ? (
          <React.Fragment>
            {refundRequest?.status === 'SHIPPING' && canShowAction ? (
              <InvoiceInfoBox
                shopName={shop.name}
                shippingLocation={refundRequest.shippingLocation}
                trackingUrl={refundRequest.individualTrackingUrl}
              />
            ) : null}
          </React.Fragment>
        ) : null}

        <Grid>
          <p className="title-info">
            <b>Return list</b>
          </p>
          <p className="title-info">
            <b>Subtotal</b>
          </p>
          <p className="title-info">
            <b>Qty</b>
          </p>
          <p className="title-info last-child">
            <b>Total</b>
          </p>
        </Grid>
        <ProductContainer>
          {refundRequest?.items?.map((x) => {
            const {
              id: itemId,
              price,
              product: {
                name: productName,
                id,
                imageUrls: [imageUrl],
              },
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
                <p className="title-info">{currencyFormatter(price)}</p>
                <p className="title-info">
                  {productQuantity.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </p>
                <p className="title-info last-child">
                  {currencyFormatter(+price * +productQuantity)}
                </p>
              </Grid>
            );
          })}
        </ProductContainer>
        <DetailBox>
          <p className="mg-b-16">
            <b>Return reason</b>
          </p>
          <p>{refundRequest?.requestReason}</p>
          {refundRequest?.description ? (
            <p className="gray1">{refundRequest?.description} </p>
          ) : null}
        </DetailBox>
        <DetailBox>
          <p className="mg-b-8">
            <b>Phone Number</b>
          </p>
          <p className="gray1">
            {`${refundRequest?.phoneCountryCode} | ${refundRequest?.phoneNumber}`}
          </p>
        </DetailBox>
        <DetailBox>
          <p className="mg-b-16">
            <b> Provide pictures of the problem</b>
          </p>
          <RefundImageContainer>
            {refundRequest?.imageUrls?.map((x) => {
              return <RefundImage src={x} key={x} />;
            })}
          </RefundImageContainer>
        </DetailBox>
        {refundRequest?.status === 'ACCEPTED' &&
        !refundRequest?.shippingLocation ? (
          <React.Fragment>
            <ShippingContainer>
              <p className="mg-b-24">
                <b>Pickup address</b>
              </p>

              {shippingLocationList.map((x) => (
                <ShippingBox
                  key={x.id}
                  onClick={() => setSelectedLocation(x.id)}
                >
                  <div class="main-content">
                    {selectedLocation == x.id ? <CheckShippingIcon /> : null}
                    <p className="mg-b-16">{x.locationName}</p>
                  </div>
                  <p>{`${x.addressLine}, ${x.ward}, ${x.district}, ${x.province}`}</p>
                </ShippingBox>
              ))}

              <div className="checkbox">
                <input
                  type="checkbox"
                  name=""
                  value="paidBy"
                  id="paidBy"
                  checked={shippingFeePayBy === 'INDIVIDUAL'}
                  onChange={handleCheckChange}
                />
                <label htmlFor="paidBy">I will pay for the shipping fee</label>
              </div>
            </ShippingContainer>
            {canShowAction ? (
              <div className="submit-action">
                <CustomButton onClick={updateReturnShipping}>
                  Submit
                </CustomButton>
              </div>
            ) : null}
          </React.Fragment>
        ) : null}
      </Page>

      <SobyModal open={openError} setOpen={setOpenError}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpenError} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default RequestInfo;
