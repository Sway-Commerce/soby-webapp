import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SobyModal from '../../components/ui/modal/modal.component';
import ErrorPopup from '../../components/ui/error-popup/error-popup.component';
import usePhoneNumber from '../../shared/hooks/usePhoneNumber';
import { useMutation } from '@apollo/client';
import { UPDATE_PHONE } from 'graphQL/repository/individual.repository';
import Spinner from 'components/ui/spinner/spinner.component';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import { ReactComponent as EditIcon } from 'shared/assets/edit-pencil.svg';
import CustomButton from 'components/ui/custom-button/custom-button.component';

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const InputBox = styled.div`
  margin-top: 16px;
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Box = styled.form`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  width: 440px;

  h2 {
    margin: 0.8rem 0 2rem;
  }

  button.main-btn {
    margin-bottom: 0;
  }

  @media (max-width: 440px) {
    width: 100%;
  }
`;

const PhonePopup = ({
  currentPhoneCountryCode,
  currentPhoneNumber,
  setOpenEditPhonePopup,
  setNewPhoneCountryCode,
  setNewPhone,
  setOpenVerifyPhonePopup,
}) => {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [phoneNumberIntl, setPhoneNumberIntl] = useState('');
  const [phoneNumberIntlCurrent] = useState(
    `${currentPhoneCountryCode} ${currentPhoneNumber}`
  );
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const { phoneCountryCode, phoneNumber } = usePhoneNumber(phoneNumberIntl);
  const [active, setActive] = useState(false);

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
      setOpenEditPhonePopup(false);
      setNewPhoneCountryCode(phoneCountryCode);
      setNewPhone(phoneNumber);
      setOpenVerifyPhonePopup(true);
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
          <h5>Phone numbers</h5>
          {active ? (
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
                <p className="error-title">*Your phone number is not correct</p>
              ) : null}
            </InputBox>
          ) : (
            <React.Fragment>
              <EditContainer>
                <p className="body-color">{phoneNumberIntlCurrent}</p>
                <EditIcon
                  className="clickable"
                  onClick={() => setActive(!active)}
                />
              </EditContainer>
            </React.Fragment>
          )}
        </InputContainer>

        {active && <CustomButton className="main-btn">Get code</CustomButton>}
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
