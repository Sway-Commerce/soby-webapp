import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sentIcon from 'shared/assets/sentIcon.svg';
import PhoneInput from 'react-phone-number-input';
import { Link, useParams } from 'react-router-dom';
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
import { GET_AGGREGATED_ASSESS_LIST_FOR_INDIVIDUAL } from '../../graphQL/repository/dispute.repository';
import { timestampToDate } from 'shared/utils/getDate';
import { grayColor } from 'shared/css-variable/variable';

const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 24px;
  position: absolute;
  background: #ffffff;
  margin-top: 40px;
  width: 1200px;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const HeaderContainer = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: 463px repeat(4, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ItemContainer = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 463px repeat(4, 1fr);
  padding: 32px 0 16px;
  border-top: 1px solid #e4e4e4;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  :last-child {
    text-align: right;
  }
`;

const SubContainer = styled.div`
  margin: 16px 0;
  display: flex;
  height: 40px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  align-items: center;
  padding: 4px 16px;
  width: 100%;
  border-top: 1px solid #e4e4e4;
  justify-content: space-between;
`;

const ReturnRequestList = () => {
  const AssessType = ['PROCESSING', 'SATISFIED', 'WANT_TO_RETURN'];
  const DisputeType = {
    PROCESSING: {
      name: 'Processing',
      colorClass: 'gray',
    },
    SATISFIED: {
      name: 'Accepted',
      colorClass: 'green',
    },
    WANT_TO_RETURN: {
      name: 'Want to return',
      colorClass: 'orange',
    },
  };

  const RefundRequestStatus = {
    PROCESSING: {
      name: 'Processing',
      colorClass: 'gray',
    },
    ACCEPTED: {
      name: 'Accepted',
      colorClass: 'green',
    },
    AUTO_ACCEPTED: {
      name: 'Auto accepted',
      colorClass: 'green',
    },
    REJECTED: {
      name: 'Rejected',
      colorClass: 'red',
    },
    SHIPPING: {
      name: 'Shipping',
      colorClass: 'gray',
    },
    RETURNED: {
      name: 'Returned',
      colorClass: 'green',
    },
    REFUNDED: {
      name: 'Returned',
      colorClass: 'cyan',
    },
  };
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [assessList, setAssessList] = useState([]);
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 10,
    assessTypes: AssessType,
    orderTypes: 'INVOICE',
  });

  const [
    getAggregatedAssessListForIndividual,
    {
      loading: getAggregatedAssessListForIndividualLoading,
      error: getAggregatedAssessListForIndividualError,
      data: getAggregatedAssessListForIndividualData,
    },
  ] = useLazyQuery(GET_AGGREGATED_ASSESS_LIST_FOR_INDIVIDUAL, {
    variables: {
      query,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    getAggregatedAssessListForIndividual();
  }, [query]);

  useEffect(() => {
    if (
      getAggregatedAssessListForIndividualData
        ?.getAggregatedAssessListForIndividual?.data
    ) {
      setAssessList(
        getAggregatedAssessListForIndividualData
          .getAggregatedAssessListForIndividual.data.records
      );
    }
  }, [
    getAggregatedAssessListForIndividualData
      ?.getAggregatedAssessListForIndividual?.data,
  ]);

  // Error handle
  useEffect(() => {
    if (getAggregatedAssessListForIndividualError?.message) {
      setFormError(getAggregatedAssessListForIndividualError?.message);
      setOpen(true);
    }
  }, [getAggregatedAssessListForIndividualError?.message]);

  return getAggregatedAssessListForIndividualLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        <HeaderContainer>
          <p>
            <b>Invoice name</b>
          </p>
          <p>
            <b>Date</b>
          </p>
          <p>
            <b>Price</b>
          </p>
          <p>
            <b>Seller</b>
          </p>
          <p className="text-right">
            <b>Status</b>
          </p>
        </HeaderContainer>

        {assessList.map((x) => {
          debugger;
          const {
            id,
            assessType,
            updatedAt,
            transferAmount,
            invoice: { name },
            shop: { name: shopName },
            refundRequests,
          } = x;

          const { name: assessTypeName, colorClass } = DisputeType[assessType];
          return (
            <Link key={id} to={`/return-request-detail/${id}`}>
              <ItemContainer>
                <p>{name}</p>
                <p>{timestampToDate(updatedAt)}</p>
                <p>{currencyFormatter(transferAmount)}</p>
                <p>{shopName}</p>
                <p className={`text-right ${colorClass}`}>{assessTypeName}</p>
              </ItemContainer>
              {refundRequests.map((rr) => {
                const { id: rrId, status } = rr;
                const { colorClass, name } = RefundRequestStatus[status];
                return (
                  <SubContainer key={rrId}>
                    <p>Return Request {rrId}</p>
                    <p className={colorClass}>{name}</p>
                  </SubContainer>
                );
              })}
            </Link>
          );
        })}
      </Container>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default ReturnRequestList;
