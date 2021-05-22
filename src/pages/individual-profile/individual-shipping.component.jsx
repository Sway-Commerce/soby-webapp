import { useLazyQuery } from '@apollo/client';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { GET_INDIVIDUAL_SHIPPING_LOCATION_LIST } from 'graphQL/repository/shipping.repository';
import React, { useEffect, useState } from 'react';
import { borderColor, mainColor } from 'shared/css-variable/variable';
import styled from 'styled-components';
import CreateShipping from './create-shipping.component';
import { Page } from './edit-profile.component';
import { ReactComponent as EditPencilIcon } from 'shared/assets/edit-pencil.svg';
import buildAddressString from 'shared/utils/buildAddressString';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => (props.left ? 'left' : 'space-between')};
  align-items: center;
  border-bottom: ${(props) => (props.border ? '0.5px solid #c2c2c2' : 'none')};
  width: ${(props) => props.size || 'auto'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
  margin-bottom: ${(props) =>
    props.first ? '24px' : props.sub ? '32px' : '8px'};

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
  font-style: normal;
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 24px;
  color: ${mainColor};
  border-radius: 8px;
  border: none;
  background-color: #ffffff;
  display: ${(props) => (props.show ? 'flex' : 'none')};

  /* @media (max-width: 768px) {
    display: ${(props) => (props.hide ? 'flex' : 'none')};
  } */
`;


const ShippingItem = styled.div`
  border: 1px solid ${borderColor};
  padding: 8px 12px;
  position: relative;
  p + p {
    margin-top: 5px;
  }

  p {
    span + span {
      margin-left: 32px;
    }
  }

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
`;

const IndividualShipping = ({ setOpenEditMailPopup, email }) => {
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [formError, setFormError] = useState('');
  const [shippingList, setShippingList] = useState([]);
  const [breadcrumbs] = useState([
    {
      name: 'Your account',
      src: '/individual-profile',
    },
    {
      name: 'Shipping information',
      src: '/individual-shipping',
    },
  ]);

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
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Page>
        <Row first>
          <h4>Shipping info</h4>
          <AddButton onClick={() => setOpenCreate(true)} show>
            + Add New
          </AddButton>
        </Row>
        {shippingList.map((x, i) => (
          <React.Fragment key={x.id}>
            <ShippingItem>
              <p>
                <b className="txt-capitalize">{x.locationName}</b>
              </p>
              <p>
                {buildAddressString(x)}
              </p>
              <p>{`${x.phoneCountryCode} ${x.phoneNumber}`}</p>
              <p>
                <span>{x.province}</span>
                <span>{x.district}</span>
                <span>{x.ward}</span>
              </p>
              <EditPencilIcon />
            </ShippingItem>
          </React.Fragment>
        ))}
      </Page>

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

// <Row>
// <AddButton onClick={() => setOpenCreate(true)} hide>
//   + Add New
// </AddButton>
// </Row>
