import UserActionTypes from './user.types';

const INITIAL_STATE = {
  accessToken: null,
  signingSecret: null,
  encryptionSecret: null,
  signingPublicKey: null,
  encryptionPublicKey: null,
  phoneNumber: null,
  phoneCountryCode: null,
  email: null,
  invitationCode: null,
  postalCode: null,
  lastName: null,
  middleName: null,
  dob: null,
  nationality: null,
  addressLine: null,
  city: null,
  province: null,
  country: null,
  firstName: null,
  id: null,
  imageUrl: null,
  kycStatus: null,
  emailStatus: null,
  phoneStatus: null,
  pendingIdentities: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS: {
      const {
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
      } = action.payload;
      return {
        ...state,
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
      };
    }
    case UserActionTypes.SIGN_UP_SUCCESS: {
      const {
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
      } = action.payload;
      return {
        ...state,
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
        accessToken: null,
      };
    }
    case UserActionTypes.SIGN_OUT_START:
      return INITIAL_STATE;
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SET_USER_PHONE_NUMBER: {
      const { phoneNumber, phoneCountryCode } = action.payload;
      return {
        ...state,
        phoneNumber,
        phoneCountryCode,
      };
    }
    case UserActionTypes.SET_ACCESS_TOKEN: {
      const accessToken = action.payload;
      return {
        ...state,
        accessToken,
      };
    }
    case UserActionTypes.SET_NAME_AND_IMAGE: {
      const { imageUrl, firstName, lastName, middleName } = action.payload;
      return {
        ...state,
        imageUrl,
        firstName,
        lastName,
        middleName,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
