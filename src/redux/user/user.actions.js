import UserActionTypes from './user.types';

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

export const verifyPhone = (phoneStatus) => ({
  type: UserActionTypes.VERIFY_PHONE,
  payload: phoneStatus,
});

export const setAccessToken = (accessToken) => ({
  type: UserActionTypes.SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const setNameAndImage = ({
  imageUrl,
  firstName,
  lastName,
  middleName,
}) => ({
  type: UserActionTypes.SET_NAME_AND_IMAGE,
  payload: { imageUrl, firstName, lastName, middleName },
});

export const setEmail = (email) => ({
  type: UserActionTypes.SET_EMAIL,
  payload: email,
});

export const setPhoneNumber = ({ phoneNumber, phoneCountryCode }) => ({
  type: UserActionTypes.SET_PHONE_NUMBER,
  payload: { phoneNumber, phoneCountryCode },
});

export const verifyEmail = (emailStatus) => ({
  type: UserActionTypes.VERIFY_EMAIL,
  payload: emailStatus,
});

export const updateStoredUser = ({
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
  passphare,
  storeEncryptionSecret,
  storeSigningSecret,
}) => ({
  type: UserActionTypes.UPDATE_STORED_USER,
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
    passphare,
    storeEncryptionSecret,
    storeSigningSecret,
  },
});

export const setRegisterInfo = ({
  email,
  lastName,
  firstName,
  middleName,
  signingSecret,
  encryptionSecret,
  signingPublicKey,
  encryptionPublicKey,
  password,
}) => ({
  type: UserActionTypes.SET_REGISTER_INFO,
  payload: {
    email,
    lastName,
    firstName,
    middleName,
    signingSecret,
    encryptionSecret,
    signingPublicKey,
    encryptionPublicKey,
    password,
  },
});
