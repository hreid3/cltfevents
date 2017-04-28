/**
 * Created by hreid on 4/26/17.
 */


export const currencyFormatterUs = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})
