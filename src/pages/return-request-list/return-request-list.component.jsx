import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Spinner from 'components/ui/spinner/spinner.component';
import { currencyFormatter } from 'shared/utils/formatCurrency';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import { GET_AGGREGATED_ASSESS_LIST_FOR_INDIVIDUAL } from '../../graphQL/repository/dispute.repository';
import { timestampToDate } from 'shared/utils/getDate';
import { DisputeType } from 'shared/constants/dispute.constant';
import RequestItem from './request-item.component';

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

const ItemContainer = styled(Link)`
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
          const {
            id,
            assessType,
            updatedAt,
            transferAmount,
            invoice: { name },
            shop: { name: shopName },
            refundRequests,
            orderId,
          } = x;

          const { name: assessTypeName, colorClass } = DisputeType[assessType];
          return (
            <React.Fragment key={id}>
              <ItemContainer to={`/return-request-detail/${orderId}`}>
                <p>{name}</p>
                <p>{timestampToDate(updatedAt)}</p>
                <p>{currencyFormatter(transferAmount)}</p>
                <p>{shopName}</p>
                <p className={`text-right ${colorClass}`}>{assessTypeName}</p>
              </ItemContainer>
              <RequestItem refundRequests={refundRequests} assessId={id} />
            </React.Fragment>
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
