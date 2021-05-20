export const timestampToDate = (timestamp) => {
  if(!timestamp) {
    return null;
  }
  const date = new Date(+timestamp);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let dt = date.getDate();
  dt = dt < 10 ? `0${dt}` : dt;

  return `${dt}/${month}/${year}`;
};

export const vnpayFormatToDate = (value = '') => {
  // yyyyMMddHHmmss
  const year = value.substr(0,4);
  const month = value.substr(4,2);
  const day = value.substr(6,2);

  return `${day}/${month}/${year}`;
}
