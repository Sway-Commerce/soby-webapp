/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import styled from 'styled-components';

import KybStatus from 'components/kyb-status/kyb-status.component';
import SobyModal from 'components/ui/modal/modal.component';
import EditProfile from './edit-profile.component';
import PasswordPopup from './edit-password.component';
import EmailPopup from './edit-mail-popup.component';
import PhonePopup from './edit-phone-popup.component';
import EmailCodePopup from './verify-email-popup.component';
import PhoneCodePopup from './verify-phone-popup.component';
import {
  subColor,
  bodyColor,
  stokeColor,
} from '../../shared/css-variable/variable';

import { ReactComponent as VerifiedIcon } from 'shared/assets/verified.svg';
import { ReactComponent as PhoneBlackIcon } from 'shared/assets/phone-black.svg';
import { ReactComponent as IdCardIcon } from 'shared/assets/id-card.svg';
import { ReactComponent as EmailBlackIcon } from 'shared/assets/email-black.svg';
import { ReactComponent as ArrowRightIcon } from 'shared/assets/arrow-right.svg';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { decryptIndividualModel, GETSECRET, GET_INDIVIDUAL_BASIC_INFO } from 'graphQL/repository/individual.repository';
import { signOutStart, updateStoredUser } from 'redux/user/user.actions';

export const Page = styled.div`
  background-color: #ffffff;
  padding: 0.5rem 1.2rem;
  width: 30rem;
  margin:0 auto;
  @media screen and (max-width: 600px) {
    width: auto;
	}
`;

export const AvatarBox = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h2`
  margin-left: 0.8rem;
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
  const {
    signingSecret,
    encryptionSecret,
    signingPublicKey,
    encryptionPublicKey,
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
    id,
    imageUrl,
    kycStatus,
    emailStatus,
    phoneStatus,
    pendingIdentities,
    accessToken,
  } = useSelector((state) => {
    return state.user;
  });

  const [openEditMailPopup, setOpenEditMailPopup] = useState(false);
  const [openEditPhonePopup, setOpenEditPhonePopup] = useState(false);
  const [openVerifyPhonePopup, setOpenVerifyPhonePopup] = useState(false);
  const [openVerifyEmailPopup, setOpenVerifyEmailPopup] = useState(false);
  const [breadcrumbs] = useState([
    {
      name: 'Your account',
      src: '/individual-profile',
    }
  ]);

  const [
    getBasicInfo,
    {
      data: loadIndividualBasicInfoData,
      loading: loadIndividualBasicInfoLoading,
      error: loadIndividualBasicInfoError,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO);
  const [
    getSecret,
    { data: getSecretData, loading: getSecretLoading, error: getSecretError },
  ] = useLazyQuery(GETSECRET);

  useEffect(() => {
    if (loadIndividualBasicInfoData?.getIndividual?.data) {
      getSecret();
    }
  }, [loadIndividualBasicInfoData?.getIndividual?.data]);


  const dispatch = useDispatch();
  const dispatchUpdateStoredUser = (payload) =>
    dispatch(updateStoredUser(payload));
  const dispatchSignOutStart = () =>
    dispatch(signOutStart());

  // useEffect(() => {
  //   if (
  //     loadIndividualBasicInfoData?.getIndividual?.data &&
  //     getSecretData?.getSecret?.data
  //   ) {

  //     async function decryptData() {
  //       const {
  //         signingSecret,
  //         encryptionSecret,
  //         signingPublicKey,
  //         encryptionPublicKey,
  //       } = getSecretData?.getSecret?.data;

  //       const {
  //         firstName,
  //         phoneNumber,
  //         phoneCountryCode,
  //         email,
  //         invitationCode,
  //         postalCode,
  //         lastName,
  //         middleName,
  //         dob,
  //         nationality,
  //         addressLine,
  //         city,
  //         province,
  //         country,
  //         id,
  //         imageUrl,
  //         kycStatus,
  //         emailStatus,
  //         phoneStatus,
  //         pendingIdentities,
  //       } = await decryptIndividualModel(
  //         encryptionSecret,
  //         password,
  //         loadIndividualBasicInfoData?.getIndividual?.data
  //       );

  //       dispatchUpdateStoredUser({
  //         signingSecret,
  //         encryptionSecret,
  //         signingPublicKey,
  //         encryptionPublicKey,
  //         phoneNumber,
  //         phoneCountryCode,
  //         email,
  //         invitationCode,
  //         postalCode,
  //         lastName,
  //         middleName,
  //         dob,
  //         nationality,
  //         addressLine,
  //         city,
  //         province,
  //         country,
  //         firstName,
  //         id,
  //         imageUrl,
  //         kycStatus,
  //         emailStatus,
  //         phoneStatus,
  //         pendingIdentities,
  //       });

  //       const redirectUrl = localStorage.getItem('redirectUrl');
  //       localStorage.removeItem('redirectUrl');
  //       window.location = redirectUrl || '/individual-profile';
  //     }

  //     decryptData();
  //   }
  // }, [
  //   loadIndividualBasicInfoData?.getIndividual?.data,
  //   getSecretData?.getSecret?.data,
  // ]);

  return (
    <React.Fragment>
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Page>
        <AvatarBox>
          <Avatar src={imageUrl} />
          <Name>{`${lastName} ${middleName} ${firstName}`}</Name>
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
            <p>{phoneCountryCode}&nbsp;{phoneNumber}</p>
            {phoneStatus === 'CONFIRMED' ? (
              <VerifiedIcon />
            ) : (
              <VerifyBtn onClick={() => setOpenVerifyPhonePopup(true)}>Verify</VerifyBtn>
            )}
          </div>
          <div className="info-row">
            <EmailBlackIcon />
            <p>{email}</p>
            {emailStatus === 'CONFIRMED' ? (
              <VerifiedIcon />
            ) : (
              <VerifyBtn  onClick={() => setOpenVerifyEmailPopup(true)}>Verify</VerifyBtn>
            )}
          </div>
        </InfoBox>
        <Row to="/edit-profile" pointer>
          <p>Edit information</p>
          <ArrowRightIcon />
        </Row>
        <Row to="/change-password" pointer>
          <p>Password</p>
          <ArrowRightIcon />
        </Row>
        <Row to="/individual-shipping" pointer >
          <p>Shipping info</p>
          <ArrowRightIcon />
        </Row>
        <Row
          pointer
          to="#"
          onClick={() => window.location = "https://soby.vn/en/soby-privacy-terms%e2%80%8b/soby-terms-of-service/"}
        >
          <p>Terms and Polices</p>
          <ArrowRightIcon />
        </Row>
        <p className="red mg-b-24" onClick={() => {
          dispatchSignOutStart();
          window.location = "/phone-signin"
        }}>Logout</p>
      </Page>


      <SobyModal open={openEditMailPopup} setOpen={setOpenEditMailPopup}>
        {openEditMailPopup ? (
          <EmailPopup
            setOpenEditMailPopup={setOpenEditMailPopup}
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
          />
        ) : null}
      </SobyModal>
      <SobyModal open={openVerifyPhonePopup} setOpen={setOpenVerifyPhonePopup}>
        {openVerifyPhonePopup ? (
          <PhoneCodePopup
            setOpenVerifyPhonePopup={setOpenVerifyPhonePopup}
            phoneCountryCode={phoneCountryCode}
            phoneNumber={phoneNumber}
          />
        ) : null}
      </SobyModal>

      <SobyModal open={openVerifyEmailPopup} setOpen={setOpenVerifyEmailPopup}>
        {openVerifyEmailPopup ? (
          <EmailCodePopup
            setOpenVerifyEmailPopup={setOpenVerifyEmailPopup}
            email={email}
          />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default IndividualProfile;
