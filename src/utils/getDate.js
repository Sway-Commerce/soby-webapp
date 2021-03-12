export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let dt = date.getDate();
  dt = dt < 10 ? `0${dt}` : dt;

  return `${dt}/${month}/${year}`;
};
