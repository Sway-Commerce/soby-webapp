/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { UPDATE_EMAIL } from 'graphQL/repository/individual.repository';
import React, { useEffect, useState } from 'react';
import emailValidation from 'shared/utils/emailValidation';
import styled from 'styled-components';
import { ReactComponent as EditIcon } from 'shared/assets/edit-pencil.svg';
import FormInput from 'components/form-input/form-input.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';

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

const EmailPopup = ({
  setOpenEditMailPopup,
  email,
  setOpenVerifyEmailPopup,
  setNewEmail: setNewEmailInfo,
}) => {
  const [newEmail, setNewEmail] = useState(email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [active, setActive] = useState(false);

  // UPDATE_EMAIL
  const [
    updateEmailMutation,
    {
      data: updateEmailData,
      loading: updateEmailLoading,
      error: updateEmailError,
    },
  ] = useMutation(UPDATE_EMAIL);
  useEffect(() => {
    if (updateEmailData?.updateEmail?.success) {
      setOpenEditMailPopup(false);
      setNewEmailInfo(newEmail);
      setOpenVerifyEmailPopup(true);
    }
  }, [updateEmailData?.updateEmail?.success, updateEmailMutation]);

  useEffect(() => {
    if (updateEmailError?.message) {
      setFormError(updateEmailError?.message);
      setOpen(true);
    }
  }, [updateEmailError?.message]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { value } = event?.target;

    setNewEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newEmail) {
      return;
    }

    const isEmailValid = emailValidation(newEmail);
    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      updateEmailMutation({ variables: { cmd: { email: newEmail } } });
    }
  };

  return updateEmailLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box onSubmit={handleSubmit}>
        <h2 className="soby-title">Edit Email</h2>
        {active ? (
          <FormInput
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={handleChange}
            label="Email address"
          />
        ) : (
          <React.Fragment>
            <h5>Email address</h5>
            <EditContainer>
              <p className="body-color">{email}</p>
              <EditIcon
                className="clickable"
                onClick={() => setActive(!active)}
              />
            </EditContainer>
          </React.Fragment>
        )}
        {
          // <InputContainer>
          //   <span>Your current email</span>
          //   <Input value={email} disabled />
          // </InputContainer>
          // <InputContainer>
          //   <span>New email</span>
          //   <Input onChange={handleChange} />
          // </InputContainer>
        }

        {!isEmailValid ? (
          <p className="error-title">*Your email is not correct</p>
        ) : null}
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

export default EmailPopup;
