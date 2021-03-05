import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  signingSecret: null,
  encryptionSecret: null,
  phoneNumber: null,
  phoneCountryCode: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      const { signingSecret, encryptionSecret } = action.payload;
      return {
        ...state,
        signingSecret,
        encryptionSecret,
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
