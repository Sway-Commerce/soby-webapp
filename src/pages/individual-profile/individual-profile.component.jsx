/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import SobyModal from 'components/ui/modal/modal.component';
import EmailPopup from './edit-mail-popup.component';
import PhonePopup from './edit-phone-popup.component';
import EmailCodePopup from './verify-email-popup.component';
import PhoneCodePopup from './verify-phone-popup.component';
import { bodyColor, stokeColor } from '../../shared/css-variable/variable';

import { ReactComponent as VerifiedIcon } from 'shared/assets/verified.svg';
import { ReactComponent as PhoneBlackIcon } from 'shared/assets/phone-black.svg';
import { ReactComponent as IdCardIcon } from 'shared/assets/id-card.svg';
import { ReactComponent as EmailBlackIcon } from 'shared/assets/email-black.svg';
import { ReactComponent as ArrowRightIcon } from 'shared/assets/arrow-right.svg';
import { ReactComponent as EditInfoIcon } from 'shared/assets/edit-individual.svg';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import {
  decryptIndividualModel,
  GET_INDIVIDUAL_BASIC_INFO,
} from 'graphQL/repository/individual.repository';
import { signOutStart, updateStoredUser } from 'redux/user/user.actions';
import Spinner from 'components/ui/spinner/spinner.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';

export const Page = styled.div`
  background-color: #ffffff;
  padding: 0.5rem 1.2rem;
  width: 30rem;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    width: auto;
  }
`;

export const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 108px;
    display: block;
  }
  svg {
    width: 32px;
    height: 32px;
    display: none;
  }
  @media screen and (max-width: 600px) {
    button {
      display: none;
    }
    svg {
      display: flex;
    }
  }
`;

const Name = styled.h2`
  margin-left: 0.8rem;
  flex: 1;
`;

export const Avatar = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoBox = styled.div`
  margin: 1.6em 0 1.7em;

  div.info-row {
    height: 2.4em;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    background-color: #f1f1f1;

    & + div.info-row {
      margin-top: 0.8rem;
    }

    p {
      color: ${bodyColor};
      margin-left: 0.8rem;
      flex: 1;
    }
  }
`;

const Row = styled(Link)`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => (props.left ? 'left' : 'space-between')};
  align-items: center;
  border-bottom: ${(props) => (props.border ? '0.5px solid #c2c2c2' : 'none')};
  width: ${(props) => props.size || 'auto'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    align-items: flex-start;

    &.column {
      flex-direction: column;
    }
  }
`;

const VerifyBtn = styled.button`
  border: ${stokeColor} 1px solid;
  color: ${stokeColor};
  background-color: #ffffff;
  padding: 0.4rem 0.5rem;
  border-radius: 3px;
`;

const IndividualProfile = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const {
    phoneNumber,
    phoneCountryCode,
    email,
    lastName,
    middleName,
    firstName,
    id,
    imageUrl,
    kycStatus,
    emailStatus,
    phoneStatus,
    storeEncryptionSecret,
    storeSigningSecret,
  } = user;

  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPhoneCountryCode, setNewPhoneCountryCode] = useState('');
  const [openEditMailPopup, setOpenEditMailPopup] = useState(false);
  const [openEditPhonePopup, setOpenEditPhonePopup] = useState(false);
  const [openVerifyPhonePopup, setOpenVerifyPhonePopup] = useState(false);
  const [openVerifyEmailPopup, setOpenVerifyEmailPopup] = useState(false);
  const [breadcrumbs] = useState([
    {
      name: 'Your account',
      src: '/individual-profile',
    },
  ]);

  const [
    getBasicInfo,
    {
      data: loadIndividualBasicInfoData,
      loading: loadIndividualBasicInfoLoading,
      error: loadIndividualBasicInfoError,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if ((!openVerifyPhonePopup || !openVerifyEmailPopup) && id) {
      getBasicInfo(id);
    }
  }, [openVerifyPhonePopup, openVerifyEmailPopup, id]);

  useEffect(() => {
    if (loadIndividualBasicInfoError?.message) {
      setFormError(loadIndividualBasicInfoError?.message);
      setOpen(true);
    }
  }, [loadIndividualBasicInfoError?.message]);

  const dispatch = useDispatch();
  const dispatchUpdateStoredUser = (payload) =>
    dispatch(updateStoredUser(payload));
  const dispatchSignOutStart = () => dispatch(signOutStart());

  useEffect(() => {
    if (
      loadIndividualBasicInfoData?.getIndividual?.data &&
      storeEncryptionSecret &&
      storeSigningSecret
    ) {
      async function decryptData() {
        const {
          firstName,
          phoneNumber,
          phoneCountryCode,
          email,
          invitationCode,
          postalCode,
          lastName,
          middleName,
          dob,
          nationality,
          addressLine,
          city,
          province,
          country,
          imageUrl,
          kycStatus,
          emailStatus,
          phoneStatus,
          pendingIdentities,
        } = await decryptIndividualModel(
          storeEncryptionSecret,
          loadIndividualBasicInfoData?.getIndividual?.data?.passphrase,
          loadIndividualBasicInfoData?.getIndividual?.data,
          loadIndividualBasicInfoData?.getIndividual?.data?.passphrase,
          storeSigningSecret
        );

        dispatchUpdateStoredUser({
          ...user,
          phoneNumber,
          phoneCountryCode,
          email,
          invitationCode,
          postalCode,
          lastName,
          middleName,
          dob,
          nationality,
          addressLine,
          city,
          province,
          country,
          firstName,
          imageUrl,
          kycStatus,
          emailStatus,
          phoneStatus,
          pendingIdentities,
        });
      }

      decryptData();
    }
  }, [
    loadIndividualBasicInfoData?.getIndividual?.data,
    storeEncryptionSecret,
    storeSigningSecret,
  ]);

  return loadIndividualBasicInfoLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Page>
        <AvatarBox>
          <Avatar src={imageUrl} />
          <Name>{`${lastName} ${middleName} ${firstName}`}</Name>
          <Link to="/edit-profile">
            <CustomButton>Edit info</CustomButton>
            <EditInfoIcon />
          </Link>
        </AvatarBox>
        <InfoBox>
          <div className="info-row">
            <IdCardIcon />
            <p>Personal ID</p>{' '}
            {kycStatus === 'CONFIRMED' ? (
              <VerifiedIcon />
            ) : (
              <VerifyBtn>Verify</VerifyBtn>
            )}
          </div>
          <div className="info-row">
            <PhoneBlackIcon />
            <p
              onClick={() => setOpenEditPhonePopup(true)}
              className="clickable"
            >
              {phoneCountryCode}&nbsp;{phoneNumber}
            </p>
            {phoneStatus === 'CONFIRMED' ? (
              <VerifiedIcon />
            ) : (
              <VerifyBtn onClick={() => setOpenVerifyPhonePopup(true)}>
                Verify
              </VerifyBtn>
            )}
          </div>
          <div className="info-row">
            <EmailBlackIcon />
            <p onClick={() => setOpenEditMailPopup(true)} className="clickable">
              {email}
            </p>
            {emailStatus === 'CONFIRMED' ? (
              <VerifiedIcon />
            ) : (
              <VerifyBtn onClick={() => setOpenVerifyEmailPopup(true)}>
                Verify
              </VerifyBtn>
            )}
          </div>
        </InfoBox>
        <Row to="/change-password" pointer="true">
          <p>Password</p>
          <ArrowRightIcon />
        </Row>
        <Row to="/individual-shipping" pointer="true">
          <p>Shipping info</p>
          <ArrowRightIcon />
        </Row>
        <Row
          pointer="true"
          to="#"
          onClick={() =>
            (window.location =
              'https://soby.vn/en/soby-privacy-terms%e2%80%8b/soby-terms-of-service/')
          }
        >
          <p>Terms and Polices</p>
          <ArrowRightIcon />
        </Row>
        <p className="red mg-b-24 clickable">
          <span
            className=""
            onClick={() => {
              dispatchSignOutStart();
              window.location = '/phone-signin';
            }}
          >
            Logout
          </span>
        </p>
      </Page>

      <SobyModal open={openEditMailPopup} setOpen={setOpenEditMailPopup}>
        {openEditMailPopup ? (
          <EmailPopup
            setOpenEditMailPopup={setOpenEditMailPopup}
            setOpenVerifyEmailPopup={setOpenVerifyEmailPopup}
            setNewEmail={setNewEmail}
            email={email}
          />
        ) : null}
      </SobyModal>
      <SobyModal open={openEditPhonePopup} setOpen={setOpenEditPhonePopup}>
        {openEditPhonePopup ? (
          <PhonePopup
            setOpenEditPhonePopup={setOpenEditPhonePopup}
            currentPhoneCountryCode={phoneCountryCode}
            currentPhoneNumber={phoneNumber}
            setNewPhone={setNewPhone}
            setNewPhoneCountryCode={setNewPhoneCountryCode}
            setOpenVerifyPhonePopup={setOpenVerifyPhonePopup}
          />
        ) : null}
      </SobyModal>
      <SobyModal open={openVerifyPhonePopup} setOpen={setOpenVerifyPhonePopup}>
        {openVerifyPhonePopup ? (
          <PhoneCodePopup
            setOpenVerifyPhonePopup={setOpenVerifyPhonePopup}
            phoneCountryCode={newPhoneCountryCode || phoneCountryCode}
            phoneNumber={newPhone ||phoneNumber}
          />
        ) : null}
      </SobyModal>

      <SobyModal open={openVerifyEmailPopup} setOpen={setOpenVerifyEmailPopup}>
        {openVerifyEmailPopup ? (
          <EmailCodePopup
            setOpenVerifyEmailPopup={setOpenVerifyEmailPopup}
            email={newEmail || email}
          />
        ) : null}
      </SobyModal>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default IndividualProfile;
