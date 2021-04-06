import TransactionActionTypes from './transaction.types';

const INITIAL_STATE = {
  vnpTmnCode: '',
  vnpHashSecret: '',
  vnpUrl: '',
  vnpReturnUrl: '',
};

const transactionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionActionTypes.CHECKOUT_START:
    case TransactionActionTypes.CHECKOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default transactionReducer;
