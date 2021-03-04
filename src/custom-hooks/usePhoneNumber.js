import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';

const usePhoneNumber = (phoneNumberIntl) => {
  const [phoneCountryCode] = formatPhoneNumberIntl(phoneNumberIntl).split(' ');
  const phoneNumber = formatPhoneNumber(phoneNumberIntl).split(' ').join('');

  return { phoneCountryCode, phoneNumber };
};

export default usePhoneNumber;