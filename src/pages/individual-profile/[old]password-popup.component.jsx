import { useMutation } from '@apollo/client';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import {
  createKeyForNewPassword,
  getHashPassword,
  UPDATE_PASSWORD,
} from 'graphQL/repository/individual.repository';
import React, { useEffect, useState } from 'react';
import passwordValidation from 'shared/utils/passwordValidation';
import styled from 'styled-components';
import { Box,  PopupButton } from './shared-style.component';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.error ? 0 : '30px')};

  @media (max-width: 700px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

const InputContainer = styled.div`
  width: ${(props) => props.width || '100%'};

  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const Input = styled.input.attrs((props) => ({
  type: 'password',
}))`
  width: 100%;
  padding: 8px 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  border-bottom: 0.5px solid #c2c2c2;
  font-size: 0.9rem;
`;

const PasswordPopup = ({
  setOpenPasswordPopup,
  signingSecret,
  encryptionPublicKey,
  encryptionSecret,
}) => {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [state, setState] = useState({
    password: null,
    newPassword: null,
    confirmPassword: null,
    signingSecret,
    encryptionPublicKey,
    encryptionSecret,
  });
  const [inputValidation, setInputValidation] = useState({
    isPasswordNotValid: false,
    isNewPasswordNotValid: false,
    isPasswordDuplicateCurrent: false,
    isNewPasswordAndConfirmNotCorrect: false,
  });

  // UPDATE_PASSWORD
  const [
    updatePasswordMutation,
    {
      data: updatePasswordData,
      loading: updatePasswordLoading,
      error: updatePasswordError,
    },
  ] = useMutation(UPDATE_PASSWORD, {
    errorPolicy: 'all',
  });
  useEffect(() => {
    if (updatePasswordData?.updatePassword?.success) {
      setOpenPasswordPopup(false);
    }
  }, [updatePasswordData?.updatePassword?.success, updatePasswordMutation]);

  useEffect(() => {
    if (updatePasswordError?.message) {
      setFormError(updatePasswordError?.message);
      setOpen(true);
    }
  }, [updatePasswordError?.message]);

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event?.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isPasswordNotValid = !passwordValidation(state.password);
    const isNewPasswordNotValid = !passwordValidation(state.newPassword);

    const isPasswordDuplicateCurrent = state.password === state.newPassword;
    const isNewPasswordAndConfirmNotCorrect =
      state.newPassword !== state.confirmPassword;

    setInputValidation({
      isPasswordNotValid,
      isPasswordDuplicateCurrent,
      isNewPasswordAndConfirmNotCorrect,
      isNewPasswordNotValid,
    });

    if (
      !isPasswordNotValid &&
      !isPasswordDuplicateCurrent &&
      !isNewPasswordAndConfirmNotCorrect &&
      !isNewPasswordNotValid
    ) {
      const { encryptionSecretNew, signingSecretNew } = await createKeyForNewPassword(
        signingSecret,
        encryptionSecret,
        state.password,
        state.newPassword
      );
      updatePasswordMutation({
        variables: {
          cmd: {
            password: getHashPassword(state.password),
            newPassword: state.newPassword,
            signingSecret: signingSecretNew,
            encryptionPublicKey,
            encryptionSecret: encryptionSecretNew,
          },
        },
      });
    }
  };

  return updatePasswordLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box onSubmit={handleSubmit}>
        <h2>Password and Update your Pin</h2>

        <Row>
          <InputContainer>
            <span>Your Old Password</span>
            <Input name="password" onChange={handleChange} />
          </InputContainer>
        </Row>
        <Row>
          {inputValidation.isPasswordNotValid ? (
            <h5 className="error-title">
              Your password must be between 8 to 20 characters which contain at
              least one numeric digit, one uppercase and one lowercase letter
            </h5>
          ) : null}
        </Row>

        <Row>
          <InputContainer width="48%">
            <span>New Password</span>
            <Input name="newPassword" onChange={handleChange} />
          </InputContainer>

          <InputContainer width="48%">
            <span>Confirm new password</span>
            <Input name="confirmPassword" onChange={handleChange} />
          </InputContainer>
        </Row>

        <Row error>
          {inputValidation.isNewPasswordNotValid ? (
            <h5 className="error-title">
              Your password must be between 8 to 20 characters which contain at
              least one numeric digit, one uppercase and one lowercase letter
            </h5>
          ) : null}
        </Row>
        <Row error>
          {inputValidation.isPasswordDuplicateCurrent ? (
            <h5 className="error-title">
              Your new password is duplicate with the current
            </h5>
          ) : null}
        </Row>
        <Row error>
          {inputValidation.isNewPasswordAndConfirmNotCorrect ? (
            <h5 className="error-title">
              Your confirm password must equal your new password
            </h5>
          ) : null}
        </Row>

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

export default PasswordPopup;
