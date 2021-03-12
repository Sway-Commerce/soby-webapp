export const getBankLogo = (bankCode) => {
  return `https://sandbox.vnpayment.vn/apis/assets/images/bank/${bankCode.toLocaleLowerCase()}_logo.png`;
}