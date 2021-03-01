import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from 'react-phone-number-input';

const usePhoneNumber = (phoneNumberIntl) => {
  const [countryCode] = formatPhoneNumberIntl(phoneNumberIntl).split(' ');
  const phoneNumber = formatPhoneNumber(phoneNumberIntl).split(' ').join('');

  return { countryCode, phoneNumber };
};

export default usePhoneNumber;