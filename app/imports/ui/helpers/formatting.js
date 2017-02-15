import numeral from 'numeral';

export const cashify = (number)=> {
  return numeral(number).format('$0,0.00')
}
