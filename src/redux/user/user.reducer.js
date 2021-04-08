import UserActionTypes from './user.types';

const INITIAL_STATE = {
  accessToken: null,
  signingSecret: null,
  encryptionSecret: null,
  signingPublicKey: null,
  encryptionPublicKey: null,
  phoneNumber: null,
  phoneCountryCode: null,
  error: null,
  signature: null,
  signing: null,
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
      } = action.payload;
      return {
        ...state,
        signingSecret,
        encryptionSecret,
        signingPublicKey,
        encryptionPublicKey,
        signature: null,
        phoneNumber,
        phoneCountryCode,
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
        accessToken: null
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
        accessToken
      };
    }
    default:
      return state;
  }
};

export default userReducer;
