const defaultOptions = {
  significantDigits: 0,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: 'vnd'
}

export const currencyFormatter = (value, options) => {
  if (typeof value !== 'number') value = 0
  options = { ...defaultOptions, ...options }
  value = value.toFixed(options.significantDigits)

  const [currency] = value.split('.')
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )} ${options.symbol}`
}