import { useMutation } from '@apollo/client';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import { UPDATE_EMAIL } from 'graphQL/repository/individual.repository';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail } from 'redux/user/user.actions';
import emailValidation from 'shared/utils/emailValidation';
import styled from 'styled-components';
import { Box, ErrorTitle, PopupButton } from './shared-style.component';


const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Input = styled.input.attrs((props) => ({
  type: 'email',
}))`
  width: 100%;
  padding: 8px 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 0.9rem;
`;

const EmailPopup = ({ setOpenEditMailPopup, email }) => {
  const [newEmail, setNewEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const dispatchSetEmail = (email) => dispatch(setEmail(email));

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
      dispatchSetEmail(newEmail);
      setOpenEditMailPopup(false);
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
        <h2>Edit Email</h2>
        <InputContainer>
          <span>Your current email</span>
          <Input value={email} disabled />
        </InputContainer>

        <InputContainer>
          <span>New email</span>
          <Input onChange={handleChange} />
        </InputContainer>

        {!isEmailValid ? (
          <ErrorTitle>Your email is not correct</ErrorTitle>
        ) : null}

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

export default EmailPopup;