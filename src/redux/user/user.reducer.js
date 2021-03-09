import UserActionTypes from './user.types';

const INITIAL_STATE = {
  accessToken: null,
  signingSecret: null,
  encryptionSecret: null,
  signingPublicKey: null,
  phoneNumber: null,
  phoneCountryCode: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return INITIAL_STATE;
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      const { signingSecret, encryptionSecret, signingPublicKey } = action.payload;
      return {
        ...state,
        signingSecret,
        encryptionSecret,
        signingPublicKey
      };
    case UserActionTypes.SET_USER_PHONE_NUMBER:
      const { phoneNumber, phoneCountryCode } = action.payload;
      return {
        ...state,
        phoneNumber,
        phoneCountryCode,
      };
    default:
      return state;
  }
};

export default userReducer;
