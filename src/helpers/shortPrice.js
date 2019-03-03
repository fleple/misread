export default (price, fixed = 2) => {
  let temp = Number(price);
  if(Math.abs(temp) >= 1.0e+9) {
    temp = (Math.abs(temp) / 1.0e+9).toFixed(fixed) + 'b';
  } else if(Math.abs(temp) >= 1.0e+6) {
    temp = (Math.abs(temp) / 1.0e+6).toFixed(fixed) + 'm';
  } else if(Math.abs(temp) >= 1.0e+3) {
    temp = (Math.abs(temp) / 1.0e+3).toFixed(fixed) + 'k';
  }
  return temp;
}