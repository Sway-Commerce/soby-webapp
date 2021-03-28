const passwordValidation = (password) => {
  var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;;
  return password.match(pattern);
}

export default passwordValidation;