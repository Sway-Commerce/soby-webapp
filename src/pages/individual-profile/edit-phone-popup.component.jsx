import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, ErrorTitle, PopupButton } from './shared-style.component';
import SobyModal from '../../components/ui/modal/modal.component';
import ErrorPopup from '../../components/ui/error-popup/error-popup.component';
import usePhoneNumber from '../../shared/hooks/usePhoneNumber';
import { useMutation } from '@apollo/client';
import { UPDATE_PHONE } from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from 'redux/user/user.actions';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  margin-top: 16px;
`;

const PhonePopup = ({
  currentPhoneCountryCode,
  currentPhoneNumber,
  setOpenEditPhonePopup,
}) => {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [phoneNumberIntlCurrent] = useState(
    `${currentPhoneCountryCode}${currentPhoneNumber}`
  );
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const dispatch = useDispatch();
  const dispatchSetPhoneNumber = ({ phoneCountryCode, phoneNumber }) =>
    dispatch(setPhoneNumber({ phoneCountryCode, phoneNumber }));

  // UPDATE_PHONE
  const [
    updatePhoneMutation,
    {
      data: updatePhoneMutationData,
      loading: updatePhoneMutationLoading,
      error: updatePhoneMutationError,
    },
  ] = useMutation(UPDATE_PHONE);
  useEffect(() => {
    if (updatePhoneMutationData?.updatePhone?.success) {
      dispatchSetPhoneNumber({ phoneCountryCode, phoneNumber });
      setOpenEditPhonePopup(false);
    }
  }, [updatePhoneMutationData?.updatePhone?.success, updatePhoneMutation]);

  useEffect(() => {
    if (updatePhoneMutationError?.message) {
      setFormError(updatePhoneMutationError?.message);
      setOpen(true);
    }
  }, [updatePhoneMutationError?.message]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPhoneValid = isPossiblePhoneNumber(phoneNumberIntl);

    setIsPhoneValid(isPhoneValid);

    if (isPhoneValid) {
      updatePhoneMutation({
        variables: { cmd: { phoneCountryCode, phoneNumber } },
      });
    }
  };

  return updatePhoneMutationLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box onSubmit={handleSubmit}>
        <h2>Edit phone numbers</h2>

        <InputContainer>
          <span>Your current phone numbers</span>
          <InputBox>
            <PhoneInput
              country="VN"
              international
              initialValueFormat="national"
              countryCallingCodeEditable={false}
              defaultCountry="VN"
              name="phoneNumber"
              value={phoneNumberIntlCurrent}
              disabled={true}
              onChange={(value) => setPhoneNumberIntl(value)}
            />
          </InputBox>
        </InputContainer>

        <InputContainer>
          <span>New phone numbers</span>
          <InputBox>
            <PhoneInput
              country="VN"
              international
              initialValueFormat="national"
              countryCallingCodeEditable={false}
              defaultCountry="VN"
              name="phoneNumber"
              value={phoneNumberIntl}
              onChange={(value) => setPhoneNumberIntl(value)}
            />
            {!isPhoneValid ? (
              <ErrorTitle>Your phone number is not correct</ErrorTitle>
            ) : null}
          </InputBox>
        </InputContainer>
        <PopupButton />
      </Box>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default PhonePopup;
