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
import { GET_INDIVIDUAL_ASSESS_LIST } from '../../graphQL/repository/dispute.repository';

const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 24px;
  position: absolute;
  background: #ffffff;
  width: 1200px;
  margin-top: 40px;
`;

const HeaderContainer = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: 463px repeat(4, 1fr);
`;

const ItemContainer = styled.div`
  margin-top: 32px;
  height: 40px;
  display: grid;
  grid-template-columns: 463px repeat(4, 1fr);
  padding-bottom: 30px;
  border-top: 1px solid #e4e4e4;

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
  const [query, setQuery] = useState({
    page: 0,
    pageSize: 10,
    assessTypes: AssessType[0],
    orderTypes: 'INVOICE',
  });

  const [
    getIndividualAssessList,
    {
      loading: getIndividualAssessListLoading,
      error: getIndividualAssessListError,
      data: getIndividualAssessListData,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_ASSESS_LIST, {
    variables: {
      query,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    getIndividualAssessList();
  }, [query]);

  // Error handle
  useEffect(() => {
    if (getIndividualAssessListError?.message) {
      setFormError(getIndividualAssessListError?.message);
      setOpen(true);
    }
  }, [getIndividualAssessListError?.message]);

  return getIndividualAssessListLoading ? (
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
        <ItemContainer>
          <p>HD TV invoice from Soby</p>
          <p>26/01/2020</p>
          <p>1.260.000 đ</p>
          <p>Blue Bird Shop</p>
          <p className="orange text-right">Want to return</p>
        </ItemContainer>
        <SubContainer>
          <p>Return Request 123456123456.002</p>
          <p className="gray">Request pending</p>
        </SubContainer>
        <ItemContainer>
          <p>HD TV invoice from Soby</p>
          <p>26/01/2020</p>
          <p>1.260.000 đ</p>
          <p>Soby Amazing seller</p>
          <p className="green text-right">Accepted</p>
        </ItemContainer>
        <SubContainer>
          <p>Return Request 123456123456.002</p>
          <p className="cyan">Refunded</p>
        </SubContainer>
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
