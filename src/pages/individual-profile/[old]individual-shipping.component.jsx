import { useLazyQuery } from '@apollo/client';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { GET_INDIVIDUAL_SHIPPING_LOCATION_LIST } from 'graphQL/repository/shipping.repository';
import React, { useEffect, useState } from 'react';
import buildAddressString from 'shared/utils/buildAddressString';
import styled from 'styled-components';
import CreateShipping from './create-shipping.component';

const Container = styled.div`
  margin-top: 50px;
  @media (max-width: 800px) {
    padding: 0 20px;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => (props.left ? 'left' : 'space-between')};
  align-items: center;
  border-bottom: ${(props) => (props.border ? '0.5px solid #c2c2c2' : 'none')};
  width: ${(props) => props.size || 'auto'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
  margin-bottom: ${(props) =>
    props.first ? '47px' : props.sub ? '32px' : '8px'};

  @media (max-width: 768px) {
    align-items: flex-start;


    &.column {
      flex-direction: column;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

const AddButton = styled.button`
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 24px;
  color: #000000;
  border-radius: 8px;
  width: 105px;
  height: 44px;
  padding: 9px 10px 10px 10px;
  border: none;
  display: ${(props) => (props.show ? 'flex' : 'none')};

  @media (max-width: 768px) {
    display: ${(props) => (props.hide ? 'flex' : 'none')};
  }
`;

const PrimaryState = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 0.6rem;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
  background-color: rgb(43, 116, 228);
  width: 69px;
  height: 24px;
  padding: 4px 12px 4px 12px;
  border-radius: 4px;
  border-color: rgb(43, 116, 228);
`;

const IndividualShipping = ({ setOpenEditMailPopup, email }) => {
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [formError, setFormError] = useState('');
  const [shippingList, setShippingList] = useState([]);

  const [
    loadShippingList,
    {
      data: getIndividualShippingLocationListData,
      loading: getIndividualShippingLocationListLoading,
      error: getIndividualShippingLocationListError,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_SHIPPING_LOCATION_LIST, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (
      getIndividualShippingLocationListData?.getIndividualShippingLocationList
        ?.data
    ) {
      setShippingList(
        getIndividualShippingLocationListData?.getIndividualShippingLocationList
          ?.data
      );
    }
  }, [
    getIndividualShippingLocationListData?.getIndividualShippingLocationList
      ?.data,
  ]);

  useEffect(() => {
    if (getIndividualShippingLocationListError?.message) {
      setFormError(getIndividualShippingLocationListError?.message);
      setOpen(true);
    }
  }, [getIndividualShippingLocationListError?.message]);

  useEffect(() => {
    if (!openCreate) {
      loadShippingList();
    }
  }, [openCreate]);

  return getIndividualShippingLocationListLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        <Row first>
          <h2>Thông tin giao hàng</h2>
          <AddButton onClick={() => setOpenCreate(true)} show>
            + Add New
          </AddButton>
        </Row>
        {shippingList.map((x, i) => (
          <React.Fragment key={x.id}>
            <Row>
              <p>{x.locationName}</p>
              {x.defaultLocation ? <PrimaryState>Primary</PrimaryState> : null}
            </Row>
            <Row sub border>
              <p>{buildAddressString(x)}</p>
            </Row>
          </React.Fragment>
        ))}

        <Row>
          <AddButton onClick={() => setOpenCreate(true)} hide>
            + Add New
          </AddButton>
        </Row>
      </Container>

      <SobyModal open={openCreate} setOpen={setOpenCreate}>
        {openCreate ? <CreateShipping setOpenCreate={setOpenCreate} /> : null}
      </SobyModal>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default IndividualShipping;
