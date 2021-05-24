const defaultOptions = {
  significantDigits: 0,
  thousandsSeparator: '.',
  decimalSeparator: ',',
  symbol: 'đ'
}

export const currencyFormatter = (value, options) => {
  if(!value) {
    return 0;
  }
  value = +value;
  if (typeof value !== 'number') value = 0
  options = { ...defaultOptions, ...options }
  value = value.toFixed(options.significantDigits)

  const [currency] = value.split('.')
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )} ${options.symbol}`
}