import InsureData from '../interfaces/InSureData';

export function getRateByGenderSmoker(value: InsureData, gender: string, smoker:boolean): number {
  if (gender === 'M' && smoker === true) {
    return value.hombreFumador;
  }
  else if (gender === 'M' && smoker === false) {
    return value.hombreNoFumador;
  }
  else if (gender === 'F' && smoker === false) {
    return value.mujerNoFumadora;
  } 
  else {
    return value.mujerFumadora;
  }
}
