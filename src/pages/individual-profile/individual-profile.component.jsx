import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as BellIcon } from 'shared/assets/bell.svg';
import { ReactComponent as EditIcon } from 'shared/assets/edit.svg';
import { ReactComponent as ErrorIcon } from 'shared/assets/error.svg';
import { ReactComponent as HandIcon } from 'shared/assets/hand.svg';
import { ReactComponent as KeyIcon } from 'shared/assets/key.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick.svg';
import { ReactComponent as UnionIcon } from 'shared/assets/union.svg';
import { ReactComponent as EditWhiteIcon } from 'shared/assets/edit-white.svg';
import KybStatus from 'components/kyb-status/kyb-status.component';
import SobyModal from 'components/ui/modal/modal.component';
import NamePopup from './name-popup.component';
import PasswordPopup from './password-popup.component';
import EmailPopup from './edit-mail-popup.component';
import PhonePopup from './edit-phone-popup.component';
import EmailCodePopup from './verify-email-popup.component';
import PhoneCodePopup from './verify-phone-popup.component';

const Page = styled.div`
  height: 100vh;
  padding-top: 100px;

  @media (max-width: 768px) {
    /* height: auto; */
    padding: 10px 20px 30px;
  }
`;

const Content = styled.div`
  margin: auto;

  .hidden-title {
    visibility: hidden;
  }

  @media (max-width: 1250px) {
    width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 850px) {
    h1 {
      display: none;
    }

    h2 {
      visibility: visible;
    }

    .hidden-title {
      visibility: visible;
    }
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: ${(props) => (props.left ? 'left' : 'space-between')};
  align-items: center;
  padding: 20px 0 10px;
  border-bottom: ${(props) => (props.border ? '0.5px solid #c2c2c2' : 'none')};
  width: ${(props) => props.size || 'auto'};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};

  @media (max-width: 768px) {
    align-items: flex-start;

    &.column {
      flex-direction: column;
    }
  }
`;

const Wrapper = styled.div`
  width: 48%;
  border-bottom: ${(props) => (props.border ? '0.5px solid #c2c2c2' : 'none')};
  padding-bottom: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.span`
  font-size: ${(props) => (props.small ? '.8em' : '1em')};
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
`;

const Icon = styled.div`
  cursor: pointer;
  margin-right: 8px;
  margin-left: ${(props) => (props.marginLeft ? '8px' : '0')};
  display: flex;
  align-items: center;
`;

const CircleIcon = styled(Icon)`
  position: absolute;
  bottom: -15px;
  right: -21px;
  height: 35px;
  width: 35px;
`;

const AvatarBox = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 8px;
`;
const Name = styled.h2`
  margin-left: 20px;
  color: #2b74e4;
  @media (max-width: 768px) {
    margin: auto 0 auto 20px;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 0.5px solid #c2c2c2;
  border-radius: 8px;

  h3 {
    margin: 0;
  }
  span {
    min-width: 90px;
  }

  @media (max-width: 950px) {
    span {
      padding: 3px 10px;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 470px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;

    h3 {
      margin-bottom: 10px;
    }
  }
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

  const [openNamePopup, setOpenNamePopup] = useState(false);
  const [openPasswordPopup, setOpenPasswordPopup] = useState(false);
  const [openEditMailPopup, setOpenEditMailPopup] = useState(false);
  const [openEditPhonePopup, setOpenEditPhonePopup] = useState(false);
  const [openVerifyPhonePopup, setOpenVerifyPhonePopup] = useState(false);
  const [openVerifyEmailPopup, setOpenVerifyEmailPopup] = useState(false);

  return (
    <Page>
      <Content>
        <h1>Information</h1>

        <Row className="column">
          <Wrapper>
            <Row left className="avatar-box">
              <AvatarBox>
                <Avatar src={imageUrl} />
                <CircleIcon>
                  <EditWhiteIcon onClick={() => setOpenNamePopup(true)} />
                </CircleIcon>
              </AvatarBox>
              <Name>{`${lastName} ${middleName} ${firstName}`}</Name>
            </Row>
          </Wrapper>

          <Wrapper>
            <Box>
              <h3>Personal verification - KYC</h3>
              <KybStatus status={kycStatus} />
            </Box>
          </Wrapper>
        </Row>

        <h2 className="hidden-title">Information</h2>

        <Row className="column">
          <Wrapper border>
            <Row>
              <Text>
                Email
                <Icon marginLeft>
                  {emailStatus === 'CONFIRMED' ? (
                    <TickIcon />
                  ) : (
                    <ErrorIcon onClick={() => setOpenVerifyEmailPopup(true)} />
                  )}
                </Icon>
              </Text>
              <Text small pointer onClick={() => setOpenEditMailPopup(true)}>
                <Icon>
                  <EditIcon />
                </Icon>
                Edit
              </Text>
            </Row>
            {email}
          </Wrapper>

          <Wrapper border>
            <Row>
              <Text>
                Số điện thoại
                <Icon marginLeft>
                  {phoneStatus === 'CONFIRMED' ? (
                    <TickIcon />
                  ) : (
                    <ErrorIcon onClick={() => setOpenVerifyPhonePopup(true)} />
                  )}
                </Icon>
              </Text>
              <Text small pointer onClick={() => setOpenEditPhonePopup(true)}>
                <Icon>
                  <EditIcon />
                </Icon>
                Edit
              </Text>
            </Row>
            {phoneCountryCode} {phoneNumber}
          </Wrapper>
        </Row>

        <Row border onClick={() => (window.location = '/individual-shipping')} pointer>
          <Text pointer>Thông tin giao hàng</Text>
          <Text>&gt;</Text>
        </Row>

        <Row border>
          <Text>
            <Icon>
              <BellIcon />
            </Icon>
            Notification Settings
          </Text>
          <Text small pointer>
            <Icon>
              <EditIcon />
            </Icon>
            Edit
          </Text>
        </Row>

        <Row border>
          <Text>
            <Icon>
              <KeyIcon />
            </Icon>
            Password or Upload your Pin
          </Text>
          <Text small pointer onClick={() => setOpenPasswordPopup(true)}>
            <Icon>
              <EditIcon />
            </Icon>
            Edit
          </Text>
        </Row>

        <Row
          border
          pointer
          onClick={() => {
            window.location =
              'https://soby.vn/en/soby-privacy-terms%e2%80%8b/soby-privacy-policy/';
          }}
        >
          <Text pointer>
            <Icon>
              <UnionIcon />
            </Icon>
            Soby Policies & About
          </Text>
          <Text>&gt;</Text>
        </Row>

        <Row
          border
          pointer
          onClick={() => {
            window.location =
              'https://soby.vn/en/soby-privacy-terms%e2%80%8b/soby-terms-of-service/';
          }}
        >
          <Text pointer>
            <Icon>
              <HandIcon />
            </Icon>
            Help center
          </Text>
          <Text>&gt;</Text>
        </Row>
      </Content>
      <SobyModal open={openNamePopup} setOpen={setOpenNamePopup}>
        {openNamePopup ? (
          <NamePopup
            firstName={firstName}
            lastName={lastName}
            middleName={middleName}
            accessToken={accessToken}
            dob={dob}
            postalCode={postalCode}
            country={country}
            province={province}
            city={city}
            addressLine={addressLine}
            nationality={nationality}
            imageUrl={imageUrl}
            setOpenNamePopup={setOpenNamePopup}
          />
        ) : null}
      </SobyModal>
      <SobyModal open={openPasswordPopup} setOpen={setOpenPasswordPopup}>
        {openPasswordPopup ? (
          <PasswordPopup
            setOpenPasswordPopup={setOpenPasswordPopup}
            signingSecret={signingSecret}
            encryptionPublicKey={encryptionPublicKey}
            encryptionSecret={encryptionSecret}
          />
        ) : null}
      </SobyModal>
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
    </Page>
  );
};

export default IndividualProfile;
