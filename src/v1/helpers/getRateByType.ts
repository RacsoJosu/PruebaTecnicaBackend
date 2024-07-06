import InsureData from '../interfaces/InSureData';

export function getRateByType(value: InsureData, typeRate: string): number {
  if (typeRate === 'hombreFumador') {
    return value.hombreFumador;
  } else if (typeRate === 'hombreNoFumador') {
    return value.hombreNoFumador;
  } else if (typeRate === 'mujerNoFumadora') {
    return value.mujerNoFumadora;
  } else {
    return value.mujerFumadora;
  }
}
