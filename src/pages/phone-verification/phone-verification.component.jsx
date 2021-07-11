import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from 'components/ui/custom-button/custom-button.component';

import {
  sendPhoneVerification,
  updateStoredUser,
  verifyPhone,
} from 'redux/user/user.actions';

import {
  SignUpContainer,
  CardWrapper,
  RegisterContainer,
  FormContainer,
  CodeText,
  SendAgain,
  SubText,
} from './phone-verification.styles';

import ValidationInput from 'components/validation-input/validation-input.component';
import {
  SEND_PHONE_VERIFICATION,
  VERIFY_PHONE,
} from 'graphQL/repository/individual.repository';
import { useMutation, useLazyQuery } from '@apollo/client';
import SobyModal from 'components/ui/modal/modal.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { INITIAL_STATE } from 'redux/user/user.reducer';
import {
  GET_INDIVIDUAL_BASIC_INFO,
  decryptIndividualModel,
} from 'graphQL/repository/individual.repository';

const PhoneVerification = ({ history }) => {
  const { phoneNumber, phoneCountryCode } = useSelector((state) => {
    return {
      phoneNumber: state.user.phoneNumber,
      phoneCountryCode: state.user.phoneCountryCode,
    };
  });
  const [verificationCode, setVerificationCode] = useState(null);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');

  const [
    sendPhoneVerifyMutation,
    {
      loading: sendPhoneVerificationLoading,
      error: sendPhoneVerificationError,
    },
  ] = useMutation(SEND_PHONE_VERIFICATION, {
    errorPolicy: 'all',
  });
  const [
    verifyPhoneMutation,
    { data, loading: verifyPhoneLoading, error: verifyPhoneError },
  ] = useMutation(VERIFY_PHONE, {
    errorPolicy: 'all',
  });

  const [
    getBasicInfo,
    {
      data: loadIndividualBasicInfoData,
      loading: loadIndividualBasicInfoLoading,
      error: loadIndividualBasicInfoError,
    },
  ] = useLazyQuery(GET_INDIVIDUAL_BASIC_INFO);
  
  const dispatch = useDispatch();
  const dispatchVerify = () => dispatch(verifyPhone());
  const dispatchSendVerification = () => dispatch(sendPhoneVerification());
  const dispatchUpdateStoredUser = (payload) =>
    dispatch(updateStoredUser(payload));

  useEffect(() => {
    if (verifyPhoneError?.message || sendPhoneVerificationError?.message) {
      setFormError(
        verifyPhoneError?.message ?? sendPhoneVerificationError?.message
      );
      setOpen(true);
    }
  }, [verifyPhoneError, sendPhoneVerificationError]);

//#region Reminder for task: fix bug when create account, get account to get ID
/**
 * Note: we need to research how to get all data like login flow. Example below:
 * const {
          firstName,
          phoneNumber,
          phoneCountryCode,
          email,
          invitationCode,
          postalCode,
          lastName,
          middleName,
          name,
          dob,
          nationality,
          addressLine,
          city,
          province,
          country,
          id,
          imageUrl,
          kycStatus,
          emailStatus,
          phoneStatus,
          pendingIdentities,
          storeEncryptionSecret,
          storeSigningSecret,
        } = await decryptIndividualModel(
          encryptionSecret,
          password,
          loadIndividualBasicInfoData?.getIndividual?.data,
          passphrase,
          signingSecret
        );
 */
//#endregion

  useEffect(async () => {
    if (data?.verifyPhone?.success) {
      dispatchVerify('CONFIRMED');
      // dispatchUpdateStoredUser({ ...INITIAL_STATE });
      getBasicInfo().then(function (result) {
        history.push('/individual-profile');
      });
    }
  }, [data?.verifyPhone?.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (`${verificationCode}`.length === 6) {
      setIsCodeValid(true);
      verifyPhoneMutation({
        variables: {
          cmd: { phoneCountryCode, phoneNumber, verificationCode },
        },
      });
    } else {
      setIsCodeValid(false);
    }
  };

  const collectVerifyCode = (code) => {
    setVerificationCode(+code);
    if (`${code}`.length == 6) {
      verifyPhoneMutation({
        variables: {
          cmd: { phoneCountryCode, phoneNumber, verificationCode: code },
        },
      });
    }
  };

  const sendAgain = () => {
    dispatchSendVerification();
    sendPhoneVerifyMutation({
      variables: {
        cmd: { phoneCountryCode, phoneNumber },
      },
    });
  };

  return sendPhoneVerificationLoading || verifyPhoneLoading ? (
    <Spinner />
  ) : (
    <RegisterContainer>
      <CardWrapper>
        <SignUpContainer>
          <div className="soby-title">Verify</div>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <SubText className="form-label">
                <p>Enter the 6 digit code</p>
                <p>we sent you via phone number</p>
              </SubText>

              <ValidationInput collectVerifyCode={collectVerifyCode} />
              {!isCodeValid ? (
                <p className="error-title">
                  *You have to provide the verification code
                </p>
              ) : null}
              <CodeText>
                Didn't get the code?
                <SendAgain onClick={sendAgain}>Send again</SendAgain>
              </CodeText>
              <CustomButton>Submit</CustomButton>
            </form>
          </FormContainer>
        </SignUpContainer>
      </CardWrapper>
      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </RegisterContainer>
  );
};

export default PhoneVerification;
