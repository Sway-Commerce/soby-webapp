import React, { useEffect, useState } from 'react';

import { Container, Card, MainContent } from './individual-profile.styles';
import { useParams } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useLazyQuery, useMutation } from '@apollo/client';

import { ReactComponent as Phone } from 'shared/assets/phone-icon.svg';

import { GET_SHOP_BY_ID } from 'graphQL/repository/shop.repository';
import { SEARCH_PRODUCT } from 'graphQL/repository/product.repository';

import Spinner from 'components/ui/spinner/spinner.component';
import ShopCategory from 'components/shop-category/shop-category.component';
import WebsiteUrl from 'components/website-url/website-url.component';
import ProductListCard from 'components/product-listcard/product-listcard.component';
import ShopNameCard from 'components/shop-name-card/shop-name-card.component';
import KybCard from 'components/kyb-card/kyb-card.component';
import {
  GET_INDIVIDUAL_BASIC_INFO,
  UPDATE_INDIVIDUAL,
  VERIFY_PHONE,
  SEND_PHONE_VERIFICATION,
  UPDATE_PHONE,
  VERIFY_EMAIL,
  SEND_EMAIL_VERIFICATION,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
} from 'graphQL/repository/individual.repository';

import { ReactComponent as BellIcon } from 'shared/assets/bell.svg';
import { ReactComponent as EditIcon } from 'shared/assets/edit.svg';
import { ReactComponent as ErrorIcon } from 'shared/assets/error.svg';
import { ReactComponent as HandIcon } from 'shared/assets/hand.svg';
import { ReactComponent as KeyIcon } from 'shared/assets/key.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick.svg';
import { ReactComponent as UnionIcon } from 'shared/assets/union.svg';
import { useSelector } from 'react-redux';

const IndividualProfile = () => {
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const [individualInfo, setIndividualInfo] = useState({
    name: null,
    phoneCountryCode: null,
    phoneNumber: null,
    description: null,
    imageUrl: null,
    categories: null,
    shopUrls: null,
    kycStatus: null,
  });
  const [picture, setPicture] = useState({});

  // GET_INDIVIDUAL_BASIC_INFO
  const [
    getIndividual,
    { loading: getIndividualLoading, data: getIndividualData },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO);
  useEffect(() => {
    if (getIndividualData?.getIndividual?.data) {
      const {
        name,
        phoneCountryCode,
        phoneNumber,
        imageUrl,
        categories,
        shopUrls,
        kycStatus,
      } = getIndividualData?.getIndividual?.data;

      setIndividualInfo({
        name,
        phoneCountryCode,
        phoneNumber,
        imageUrl,
        categories,
        shopUrls,
        kycStatus,
      });
    }
  }, [getIndividualData?.getIndividual?.data, getIndividual]);

  // VERIFY_PHONE
  const [
    updateIndividual,
    { data: updateIndividualData, loading: updateIndividualLoading },
  ] = useMutation(UPDATE_INDIVIDUAL);
  useEffect(() => {
    if (updateIndividualData?.updateIndividual?.data) {
    }
  }, [updateIndividualData?.updateIndividual?.data, updateIndividual]);

  // VERIFY_PHONE
  const [
    verifyPhoneMutation,
    { data: verifyPhoneData, loading: verifyPhoneLoading },
  ] = useMutation(VERIFY_PHONE);
  useEffect(() => {
    if (verifyPhoneData?.verifyPhone?.data) {
    }
  }, [verifyPhoneData?.verifyPhone?.data, verifyPhoneMutation]);

  // SEND_PHONE_VERIFICATION
  const [
    sendPhoneVerificationMutation,
    { data: sendPhoneVerificationData, loading: sendPhoneVerificationLoading },
  ] = useMutation(SEND_PHONE_VERIFICATION);
  useEffect(() => {
    if (sendPhoneVerificationData?.sendPhoneVerification?.data) {
    }
  }, [
    sendPhoneVerificationData?.sendPhoneVerification?.data,
    sendPhoneVerificationMutation,
  ]);

  // UPDATE_PHONE
  const [
    updatePhoneMutation,
    { data: updatePhoneMutationData, loading: updatePhoneMutationLoading },
  ] = useMutation(UPDATE_PHONE);
  useEffect(() => {
    if (updatePhoneMutationData?.updatePhone?.data) {
    }
  }, [updatePhoneMutationData?.updatePhone?.data, updatePhoneMutation]);

  // VERIFY_EMAIL
  const [
    verifyEmailMutation,
    { data: verifyEmailMutationData, loading: verifyEmailMutationLoading },
  ] = useMutation(VERIFY_EMAIL);
  useEffect(() => {
    if (verifyEmailMutationData?.verifyEmail?.data) {
    }
  }, [verifyEmailMutationData?.verifyEmail?.data, verifyEmailMutation]);

  // SEND_EMAIL_VERIFICATION
  const [
    sendEmailVerificationMutation,
    { data: sendEmailVerificationData, loading: sendEmailVerificationLoading },
  ] = useMutation(SEND_EMAIL_VERIFICATION);
  useEffect(() => {
    if (sendEmailVerificationData?.sendEmailVerification?.data) {
    }
  }, [
    sendEmailVerificationData?.sendEmailVerification?.data,
    sendEmailVerificationMutation,
  ]);

  // UPDATE_EMAIL
  const [
    updateEmailMutation,
    { data: updateEmailData, loading: updateEmailLoading },
  ] = useMutation(UPDATE_EMAIL);
  useEffect(() => {
    if (updateEmailData?.updateEmail?.data) {
    }
  }, [updateEmailData?.updateEmail?.data, updateEmailMutation]);

  // UPDATE_PASSWORD
  const [
    updatePasswordMutation,
    { data: updatePasswordData, loading: updatePasswordLoading },
  ] = useMutation(UPDATE_PASSWORD);
  useEffect(() => {
    if (updatePasswordData?.updatePassword?.data) {
    }
  }, [updatePasswordData?.updatePassword?.data, updatePasswordMutation]);

  // Init
  useEffect(() => {
    getIndividual();
  }, []);

  if (
    getIndividualLoading ||
    updateIndividualLoading ||
    verifyEmailMutationLoading ||
    verifyPhoneLoading ||
    updatePhoneMutationLoading ||
    sendEmailVerificationLoading ||
    updateEmailLoading ||
    updatePasswordLoading ||
    sendPhoneVerificationLoading
  )
    return <Spinner />;

  const uploadPicture = (e) => {
    setPicture({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('files', picture.pictureAsFile);

    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const data = await fetch('http://localhost:3000/upload/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Category: 'AVATAR',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: formData,
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log('Successfully uploaded image');
    } else {
      console.log('Error Found');
    }
  };

  return (
    <Container>
      <MainContent>
        <h1>Information</h1>
        <div className="main-info">
          <div></div>
          <img src={individualInfo.imageUrl} alt="logo" />
          <form onSubmit={setImageAction}>
            <input type="file" name="image" onChange={uploadPicture} />
            <br />
            <br />
            <button type="submit" name="upload">
              Upload
            </button>
          </form>
        </div>

        <KybCard status={individualInfo.kycStatus} />
        <div className="container">
          <div className="email-number">
            <div className="email-info">
              <div className="info-wrapper">
                <div className="title-info">
                  <span className="email">Email</span>
                  <ErrorIcon className="error" />
                </div>
                <div className="title-info">
                  <EditIcon className="edit-img" />
                  <span className="edit">Edit</span>
                </div>
              </div>
              <p className="sample">Sample@email.com</p>
            </div>
            <div className="number-info">
              <div className="info-wrapper">
                <div className="title-info">
                  <span className="email">Số điện thoại</span>
                  <TickIcon className="error" />
                </div>
                <div className="title-info">
                  <EditIcon className="edit-img" />
                  <span className="edit">Edit</span>
                </div>
              </div>
              <p className="sample">+84 90 123 456 789</p>
            </div>
          </div>
          <div className="ship-info">
            <p className="ship-title">Thông tin giao hàng</p>
            <img className="arrow" src="./arrow.svg" alt="" />
          </div>
          <div className="notify">
            <div className="notify-info">
              <BellIcon className="bell" />
              <span className="notify-title">Notification Settings</span>
            </div>
            <div className="title-info">
              <EditIcon className="edit-img" />
              <span className="edit">Edit</span>
            </div>
          </div>
          <div className="notify">
            <div className="notify-info">
              <KeyIcon className="bell" />
              <span className="notify-title">Password or Upload your Pin</span>
            </div>
            <div className="title-info">
              <EditIcon className="edit-img" />
              <span className="edit">Edit</span>
            </div>
          </div>
          <div className="notify">
            <div className="notify-info">
              <UnionIcon className="bell" />
              <span className="notify-title">Soby Policies & About</span>
            </div>
            <img className="arrow" src="./arrow.svg" alt="" />
          </div>
          <div className="notify">
            <div className="notify-info">
              <HandIcon className="bell" />
              <span className="notify-title">Help center</span>
            </div>
            <img className="arrow" src="./arrow.svg" alt="" />
          </div>
        </div>
      </MainContent>
    </Container>
  );
};

export default IndividualProfile;
// <div classNameName="shop-info">
//           <div classNameName="wrapper">
//             <Phone />
//             <p>{formatPhoneNumberIntl(`${phoneCountryCode}${phoneNumber}`)}</p>
//           </div>
//         </div>
