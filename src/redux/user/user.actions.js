import UserActionTypes from './user.types';

export const signInSuccess = ({
  signingSecret,
  encryptionSecret,
  signingPublicKey,
  encryptionPublicKey,
  phoneNumber,
  phoneCountryCode,
  email,
  invitationCode,
  postalCode,
  lastName,
  middleName,
  dob,
  nationality,
  addressLine,
  city,
  province,
  country,
  firstName,
  id,
  imageUrl,
  kycStatus,
  emailStatus,
  phoneStatus,
  pendingIdentities,
}) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: {
    signingSecret,
    encryptionSecret,
    signingPublicKey,
    encryptionPublicKey,
    phoneNumber,
    phoneCountryCode,
    email,
    invitationCode,
    postalCode,
    lastName,
    middleName,
    dob,
    nationality,
    addressLine,
    city,
    province,
    country,
    firstName,
    id,
    imageUrl,
    kycStatus,
    emailStatus,
    phoneStatus,
    pendingIdentities,
  },
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const phoneSignInStart = () => ({
  type: UserActionTypes.PHONE_SIGN_IN_START,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START,
});

export const signUpSuccess = ({
  signingSecret,
  encryptionSecret,
  signingPublicKey,
  encryptionPublicKey,
}) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: {
    signingSecret,
    encryptionSecret,
    signingPublicKey,
    encryptionPublicKey,
  },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const setUserPhoneNumber = ({ phoneNumber, phoneCountryCode }) => ({
  type: UserActionTypes.SET_USER_PHONE_NUMBER,
  payload: { phoneNumber, phoneCountryCode },
});

export const sendPhoneVerification = () => ({
  type: UserActionTypes.SEND_PHONE_VERIFICATION,
});

export const verifyPhone = () => ({
  type: UserActionTypes.VERIFY_PHONE,
});

export const setAccessToken = (accessToken) => ({
  type: UserActionTypes.SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const setNameAndImage = ({imageUrl, firstName, lastName, middleName}) => ({
  type: UserActionTypes.SET_NAME_AND_IMAGE,
  payload: {imageUrl, firstName, lastName, middleName},
});
