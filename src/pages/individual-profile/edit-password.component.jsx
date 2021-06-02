import { useMutation } from '@apollo/client';
import FormInput from 'components/form-input/form-input.component';
import SharedBreadcrumb from 'components/shared-breadcrumb/shared-breadcrumb.component';
import CustomButton from 'components/ui/custom-button/custom-button.component';
import ErrorPopup from 'components/ui/error-popup/error-popup.component';
import SobyModal from 'components/ui/modal/modal.component';
import Spinner from 'components/ui/spinner/spinner.component';
import {
  createKeyForNewPassword,
  getHashPassword,
  UPDATE_PASSWORD,
} from 'graphQL/repository/individual.repository';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoredUser } from 'redux/user/user.actions';
import passwordValidation from 'shared/utils/passwordValidation';
import styled from 'styled-components';
import { PageFooter } from './edit-profile.component';

export const Page = styled.div`
  background-color: #ffffff;
  padding: 1.2rem;
  width: 600px;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

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

const EditPassword = ({ history }) => {
  const user = useSelector((state) => {
    return state.user;
  });
  const { signingSecret, encryptionPublicKey, encryptionSecret, passphrase } =
    user;
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [state, setState] = useState({
    password: '',
    newPassword: '',
    confirmPassword: null,
    signingSecret,
    encryptionPublicKey,
    encryptionSecret,
    storeEncryptionSecret: '',
    storeSigningSecret: '',
    encryptionSecretNew: '',
    signingSecretNew: '',
  });
  const [inputValidation, setInputValidation] = useState({
    isPasswordNotValid: false,
    isNewPasswordNotValid: false,
    isPasswordDuplicateCurrent: false,
    isNewPasswordAndConfirmNotCorrect: false,
  });
  const [breadcrumbs] = useState([
    {
      name: 'Your account',
      src: '/individual-profile',
    },
    {
      name: 'Change password',
      src: '/change-password',
    },
  ]);

  const dispatch = useDispatch();
  const dispatchUpdateStoredUser = (payload) =>
    dispatch(updateStoredUser(payload));

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
    if (
      updatePasswordData?.updatePassword?.success &&
      state.storeEncryptionSecret &&
      state.storeSigningSecret &&
      state.encryptionSecretNew &&
      state.signingSecretNew
    ) {
      const {
        storeEncryptionSecret,
        storeSigningSecret,
        encryptionSecretNew,
        signingSecretNew,
      } = state;
      dispatchUpdateStoredUser({
        ...user,
        storeEncryptionSecret,
        storeSigningSecret,
        encryptionSecret: encryptionSecretNew,
        signingSecret: signingSecretNew,
      });
      setTimeout(() => {
        history.push('/individual-profile');
      }, 2000);
    }
  }, [
    updatePasswordData?.updatePassword?.success,
    state.storeEncryptionSecret,
    state.storeSigningSecret,
    state.encryptionSecretNew,
    state.signingSecretNew,
  ]);

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

    setInputValidation({
      isPasswordNotValid,
      isPasswordDuplicateCurrent,
      isNewPasswordNotValid,
    });

    if (
      !isPasswordNotValid &&
      !isPasswordDuplicateCurrent &&
      !isNewPasswordNotValid
    ) {
      const {
        encryptionSecretNew,
        signingSecretNew,
        error,
        storeSigningSecret,
        storeEncryptionSecret,
      } = await createKeyForNewPassword(
        state.signingSecret,
        state.encryptionSecret,
        state.password,
        state.newPassword,
        passphrase
      );
      if (error) {
        setFormError(error);
        setOpen(true);
        return;
      }

      setState({
        ...state,
        encryptionSecretNew,
        signingSecretNew,
        storeSigningSecret,
        storeEncryptionSecret,
      });

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
      <SharedBreadcrumb breadcrumbs={breadcrumbs} />
      <Page>
        <h4 className="mg-b-24">Change your password</h4>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="password"
            value={state.password}
            onChange={handleChange}
            label="Current password"
            placeholder="*******"
            name="password"
            className="mg-b-16"
            required
          />
          {inputValidation.isPasswordNotValid ? (
            <Row>
              <p className="error-title">
                *Your password must be between 8 to 20 characters which contain
                at least one numeric digit, one uppercase and one lowercase
                letter
              </p>
            </Row>
          ) : (
            <Row>
              <p className="fs-14">
                Your password must be between 8 to 20 characters which contain
                at least one numeric digit, one uppercase and one lowercase
                letter
              </p>
            </Row>
          )}

          <FormInput
            type="password"
            value={state.newPassword}
            onChange={handleChange}
            label="New password"
            placeholder="*******"
            name="newPassword"
            required
          />

          <Row error>
            {inputValidation.isNewPasswordNotValid ? (
              <p className="error-title">
                *Your password must be between 8 to 20 characters which contain
                at least one numeric digit, one uppercase and one lowercase
                letter
              </p>
            ) : null}
          </Row>
          <Row error>
            {inputValidation.isPasswordDuplicateCurrent ? (
              <p className="error-title">
                *Your new password is duplicate with the current
              </p>
            ) : null}
          </Row>

          <PageFooter>
            <CustomButton className="global-btn" type="submit">
              Save
            </CustomButton>
          </PageFooter>
        </form>
      </Page>

      <SobyModal open={open} setOpen={setOpen}>
        {formError ? (
          <ErrorPopup content={formError} setOpen={setOpen} />
        ) : null}
      </SobyModal>
    </React.Fragment>
  );
};

export default EditPassword;
