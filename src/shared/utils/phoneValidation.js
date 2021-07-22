const phoneValidation = (phone) => {
  var pattern = /^\d{8,12}$/;
  return phone.match(pattern);
}

export default phoneValidation;