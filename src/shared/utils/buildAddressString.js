const buildAddressString = (
  location = {
    addressLine: '',
    country: '',
    district: '',
    province: '',
    ward: '',
  }
) => {
  if (
    !location?.addressLine ||
    !location?.district ||
    !location?.province ||
    !location?.ward
  ) {
    return '';
  }
  return `${location.addressLine}, ${location.ward}, ${location.district}, ${location.province}, ${location.country}`;
};

export default buildAddressString;
