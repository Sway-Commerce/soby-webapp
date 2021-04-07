import React, { useEffect, useState } from 'react';

import { ShopContainer, Card, MainContent } from './individual-profile.styles';
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

const IndividualProfile = () => {
  const [individualInfo, setIndividualInfo] = useState({
    name: null,
    phoneCountryCode: null,
    phoneNumber: null,
    description: null,
    imageUrl: null,
    categories: null,
    shopUrls: null,
    kycStatus: null,
  })

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
      })
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
  }, [])

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



  return (
    <ShopContainer>
      <div className="left-panel">
        <ShopNameCard name={individualInfo.name} logoUrl={individualInfo.imageUrl} />
        <KybCard status={individualInfo?.kyb?.status} />
      </div>

      <MainContent>
        <h3>Information</h3>



      </MainContent>
    </ShopContainer>
  );
};

export default IndividualProfile;
// <div className="shop-info">
//           <div className="wrapper">
//             <Phone />
//             <p>{formatPhoneNumberIntl(`${phoneCountryCode}${phoneNumber}`)}</p>
//           </div>
//         </div>