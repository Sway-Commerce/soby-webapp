import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sentIcon from 'shared/assets/sentIcon.svg';
import PhoneInput from 'react-phone-number-input';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL,
  REQUEST_INVOICE_REFUND,
} from '../../graphQL/repository/invoice.repository';
import usePhoneNumber from 'shared/hooks/usePhoneNumber';
import Spinner from 'components/ui/spinner/spinner.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import FileUpload from 'components/file-upload/file-upload.component';
import { useSelector } from 'react-redux';
import FormInput from 'components/form-input/form-input.component';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import { REASON_MAP } from 'shared/constants/dispute.constant';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background-color: #fff;

  .checkbox {
    margin-left: -16px;
  }
`;

const Box = styled.div`
  width: 1200px;
  padding: 22px 30px;
  text-align: left;
  margin-bottom: 25px;

  h4 {
    color: ${(prop) => prop.theme.primary};
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
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-row-gap: 30px;
  align-items: center;
  text-align: right;

  h3 {
    text-align: left;
  }
`;

const HeaderCol = styled.p`
  color: ${(prop) => prop.theme.stoke};
  font-weight: 600;
  text-align: right;
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

const Counter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    margin: 0 14px;
  }

  button {
    font-size: 25px;
    outline: 0;
    background: none;
    border-radius: 5px;
    height: 30px;
    width: 30px;
    border: 1px solid ${(prop) => prop.theme.stoke};
    cursor: pointer;
  }
`;

const BoxReason = styled.div`
  border-bottom: 1px solid #c2c2c2;
  padding: 7px 0 24px;
  margin-top: 14px;
  :last-child,
  :first-child {
    border: none;
  }

  &.upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;

    img {
      margin-left: 5px;
    }
  }

  div {
    label {
      margin-left: 10px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: ${(prop) => prop.theme.stoke};
  }
`;

const SentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(prop) => prop.theme.primary};
  color: #fff;
  font-size: 18px;
  border-radius: 7px;
  outline: 0;
  border: 0;
  padding: 12px 180px;

  img {
    margin-left: 10px;
  }
`;

const ReturnRequest = () => {
  const [qty, setQty] = useState([0]);
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneValidation, setPhoneValid] = useState(true);
  const { invoiceId } = useParams();
  const [invoiceData, setInvoiceData] = useState({
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
    createdAt: '',
    description: '',
    id: '',
    invoiceId: '',
    invoiceVersion: '',
    totalWeight: '',
  });
  const [picture, setPicture] = useState([]);
  const [isSobySupport, setIsSobySupport] = useState(false);
  const [rejectCount, setRejectCount] = useState(0);
  const [requestRefundInfo, setRequestRefundInfo] = useState({
    id: invoiceId,
    reason: '',
    description: '',
    imageUrls: '',
    requiredAdmin: false,
  });

  const { accessToken } = useSelector((state) => {
    return state.user;
  });

  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);

  const { shop } = invoiceData;

  const { reason, description } = requestRefundInfo;

  // REQUEST_INVOICE_REFUND
  const [
    requestInvoiceRefund,
    {
      data: requestInvoiceRefundData,
      loading: requestInvoiceRefundLoading,
      error: requestInvoiceRefundError,
    },
  ] = useMutation(REQUEST_INVOICE_REFUND, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (requestInvoiceRefundData?.requestInvoiceRefund?.message === 'Success') {
      window.location = '/return-request';
    }
  }, [requestInvoiceRefundData?.requestInvoiceRefund?.message]);

  const [
    getAggregatedInvoiceOrderForIndividual,
    {
      loading: getAggregatedInvoiceOrderForIndividualLoading,
      error: getAggregatedInvoiceOrderForIndividualError,
      data: getAggregatedInvoiceOrderForIndividualData,
    },
  ] = useLazyQuery(GET_AGGREGATED_INVOICE_ORDER_FOR_INDIVIDUAL, {
    variables: {
      id: invoiceId,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (invoiceId) {
      getAggregatedInvoiceOrderForIndividual();
    }
  }, [invoiceId]);

  useEffect(() => {
    const invoiceData =
      getAggregatedInvoiceOrderForIndividualData
        ?.getAggregatedInvoiceOrderForIndividual?.data;
    if (invoiceData) {
      const {
        invoice,
        shippingLocation,
        shippingFee,
        individualTrackingUrl,
        orderFee,
        status,
        totalPrice,
        assess,
      } = invoiceData;
      const { name, shop, shippingType, escrowFee, items, price } = invoice;

      if (invoiceData?.assess?.refundRequests[0]?.status !== 'REJECTED') {
        window.location = '/return-request';
      }

      setQty(items.map(() => 0));

      setInvoiceData({
        name,
        shippingType,
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
        assess,
      });

      setRejectCount(
        invoiceData?.assess?.refundRequests?.filter(
          (x) => x.status === 'REJECTED'
        )?.length ?? 0
      );
    }
  }, [
    getAggregatedInvoiceOrderForIndividualData
      ?.getAggregatedInvoiceOrderForIndividual?.data,
  ]);

  // Error handle
  useEffect(() => {
    if (
      getAggregatedInvoiceOrderForIndividualError?.message ||
      requestInvoiceRefundError?.message
    ) {
      setFormError(
        getAggregatedInvoiceOrderForIndividualError?.message ||
          requestInvoiceRefundError?.message
      );
      setOpen(true);
    }
  }, [
    getAggregatedInvoiceOrderForIndividualError?.message,
    requestInvoiceRefundError?.message,
  ]);

  const handleCheckChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;

    setRequestRefundInfo({ ...requestRefundInfo, reason: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const items = qty
      .map((x, i) => {
        return { id: invoiceData.items[i].id, quantity: x };
      })
      .filter((x) => !!x.quantity);

    const formData = new FormData();
    picture.map((x) => formData.append('files', x));

    const data = await fetch('https://api-dev.soby.vn/individuals/images', {
      method: 'POST',
      headers: {
        Category: 'REFUND',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: formData,
    });
    const uploadedImage = await data.json();
    if (uploadedImage?.data) {
      requestInvoiceRefund({
        variables: {
          cmd: {
            id: invoiceId,
            phoneCountryCode,
            phoneNumber,
            reason: REASON_MAP[reason],
            description,
            imageUrls: uploadedImage?.data?.urls,
            requiredAdmin: rejectCount === 2 || isSobySupport,
            items,
          },
        },
      });
    } else {
      setFormError(uploadedImage?.message);
      setOpen(true);
    }
  };

  return requestInvoiceRefundLoading ||
    getAggregatedInvoiceOrderForIndividualLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Page>
        <Box>
          <h2>{invoiceData.name}</h2>
          <h4 style={{ textTransform: 'capitalize' }}>
            {invoiceData.status?.toLocaleLowerCase()}
          </h4>
        </Box>

        <Box>
          <Grid>
            <h3>Which product do you want return?</h3>
            <HeaderCol>Qty</HeaderCol>
            <HeaderCol>Price</HeaderCol>

            {invoiceData.items.map((x, idx) => {
              const {
                id: itemId,
                product: {
                  name: productName,
                  imageUrls: [imageUrl],
                },
                sku: { currentPrice },
                quantity: productQuantity,
              } = x;
              return (
                <React.Fragment key={itemId}>
                  <Product>
                    <img src={imageUrl} alt="" />
                    <div>
                      <p>{productName}</p>
                      <p>{shop.name}</p>
                    </div>
                  </Product>
                  <Counter>
                    <button
                      onClick={() => {
                        setQty(
                          qty.map((q, index) => {
                            if (index === idx) {
                              return q - 1;
                            }
                            return q;
                          })
                        );
                      }}
                      disabled={qty[idx] === 0}
                    >
                      -
                    </button>
                    <span>
                      {qty[idx].toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                    </span>
                    <button
                      onClick={() => {
                        setQty(
                          qty.map((q, index) => {
                            if (index === idx) {
                              return q + 1;
                            }
                            return q;
                          })
                        );
                      }}
                      disabled={qty[idx] === productQuantity}
                    >
                      +
                    </button>
                  </Counter>
                  <span>{currencyFormatter(qty[idx] * +currentPrice)}</span>
                </React.Fragment>
              );
            })}
          </Grid>
        </Box>

        <Box>
          <h3>Contact information</h3>
          <p className="bold" htmlFor="">
            Phone number
          </p>
          <PhoneInput
            country="VN"
            international
            initialValueFormat="national"
            countryCallingCodeEditable={false}
            defaultCountry="VN"
            name="phoneNumber"
            value={phoneNumberIntl}
            onChange={(value) => setPhoneNumberIntl(value)}
          />
          {!phoneValidation ? (
            <h5 className="error-title">Your phone number is not correct</h5>
          ) : null}
          {rejectCount === 1 ? (
            <BoxReason>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="reason"
                  value="sobySupport"
                  id="sobySupport"
                  checked={isSobySupport}
                  onChange={() => setIsSobySupport(!isSobySupport)}
                />
                <label htmlFor="sobySupport">Get Soby support</label>
              </div>
            </BoxReason>
          ) : rejectCount === 2 ? (
            <BoxReason>
              <p htmlFor="sobySupport">Soby supported as your requested</p>
            </BoxReason>
          ) : null}
        </Box>
        <Box>
          <h3>Return reason</h3>
          <BoxReason>
            <div className="checkbox">
              <input
                type="checkbox"
                name=""
                value="cb1"
                id="cb1"
                checked={reason === 'cb1'}
                onChange={handleCheckChange}
              />
              <label htmlFor="cb1">Wrong product</label>
            </div>
            <div style={{ marginTop: '10px' }}>
              <FormInput
                value={requestRefundInfo.description}
                onChange={(event) =>
                  setRequestRefundInfo({
                    ...requestRefundInfo,
                    description: event?.target?.value,
                  })
                }
                placeholder="Describe what happened"
                withoutTitle
                withoutBorder
                disabled={reason !== 'cb1'}
              />
            </div>
          </BoxReason>
          <BoxReason>
            <div className="checkbox">
              <input
                type="checkbox"
                name=""
                value="cb2"
                id="cb2"
                checked={reason === 'cb2'}
                onChange={handleCheckChange}
              />
              <label htmlFor="cb2">I don't want to buy this anymore</label>
            </div>
          </BoxReason>
          <BoxReason>
            <div className="checkbox">
              <input
                type="checkbox"
                name="reason"
                value="cb3"
                id="cb3"
                checked={reason === 'cb3'}
                onChange={handleCheckChange}
              />
              <label htmlFor="cb3">I make wrong order</label>
            </div>
          </BoxReason>
          <BoxReason>
            <div className="checkbox">
              <input
                type="checkbox"
                name="reason"
                value="cb4"
                id="cb4"
                checked={reason === 'cb4'}
                onChange={handleCheckChange}
              />
              <label htmlFor="cb4">Other reason</label>
            </div>
          </BoxReason>
        </Box>

        <Box>
          <h3>Provide pictures of the problem</h3>
          <p className="sub">
            If it's broken or missing something, be sure to capture an image of
            it
          </p>

          <FileUpload
            accept=".jpg,.png,.jpeg"
            label="Profile Image(s)"
            multiple
            updateFilesCb={setPicture}
          />
        </Box>

        <SentButton onClick={handleSubmit}>
          Send request <img src={sentIcon} alt="" />
        </SentButton>
      </Page>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default ReturnRequest;
