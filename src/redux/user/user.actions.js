import UserActionTypes from './user.types';

export const signInSuccess = accessToken => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: accessToken
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const phoneSignInStart = phoneAndPassword => ({
  type: UserActionTypes.PHONE_SIGN_IN_START,
  payload: phoneAndPassword
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START
});

export const signUpSuccess = ({ signingSecret, encryptionSecret }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { signingSecret, encryptionSecret }
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const setUserPhoneNumber = ({phoneNumber, phoneCountryCode}) => ({
  type: UserActionTypes.SET_USER_PHONE_NUMBER,
  payload: {phoneNumber, phoneCountryCode}
});

export const sendPhoneVerification = () => ({
  type: UserActionTypes.SEND_PHONE_VERIFICATION
});

export const verifyPhone = () => ({
  type: UserActionTypes.VERIFY_PHONE
});
