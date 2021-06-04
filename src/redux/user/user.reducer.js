import UserActionTypes from './user.types';

export const INITIAL_STATE = {
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
  password: null,
  passphrase: null,
  storeEncryptionSecret: null,
  storeSigningSecret: null,
  searchInput: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.UPDATE_STORED_USER: {
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
        passphrase,
        storeEncryptionSecret,
        storeSigningSecret,
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
        password: null,
        passphrase,
        storeEncryptionSecret,
        storeSigningSecret,
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
    case UserActionTypes.SIGN_OUT_START: {
      sessionStorage.clear();
      return INITIAL_STATE;
    }
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
    case UserActionTypes.SET_EMAIL: {
      const email = action.payload;
      return {
        ...state,
        email,
        emailStatus: 'NOT_CONFIRMED',
      };
    }
    case UserActionTypes.SET_PHONE_NUMBER: {
      const { phoneNumber, phoneCountryCode } = action.payload;
      return {
        ...state,
        phoneNumber,
        phoneCountryCode,
        phoneStatus: 'NOT_CONFIRMED',
      };
    }
    case UserActionTypes.VERIFY_PHONE: {
      const phoneStatus = action.payload;
      return {
        ...state,
        phoneStatus,
      };
    }
    case UserActionTypes.VERIFY_EMAIL: {
      const emailStatus = action.payload;
      return {
        ...state,
        emailStatus,
      };
    }
    case UserActionTypes.SET_REGISTER_INFO: {
      const {
        email,
        lastName,
        firstName,
        middleName,
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
        password,
      } = action.payload;
      return {
        ...state,
        email,
        lastName,
        firstName,
        middleName,
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
        password,
      };
    }
    case UserActionTypes.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
