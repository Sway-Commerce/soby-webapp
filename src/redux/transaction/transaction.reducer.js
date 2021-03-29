import TransactionActionTypes from './transaction.types';

const INITIAL_STATE = {
  vnpTmnCode: 'H2AM4RHG',
  vnpHashSecret: 'VXFMNTLQJOGNENNSLBHXRHAIHAWIEHNK',
  vnpUrl: 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnpReturnUrl: 'http://localhost:3000/transaction/vnpay_return',
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
