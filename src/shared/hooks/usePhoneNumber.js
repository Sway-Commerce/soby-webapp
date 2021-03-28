import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';

const usePhoneNumber = (phoneNumberIntl) => {
  const [phoneCountryCode] = formatPhoneNumberIntl(phoneNumberIntl).split(' ');
  let phoneNumber = formatPhoneNumber(phoneNumberIntl).split(' ').join('');
  if (phoneCountryCode === '+84') {
    phoneNumber = phoneNumber.substring(1);
  }

  return { phoneCountryCode, phoneNumber };
};

export default usePhoneNumber;