import InsureData from '../interfaces/InSureData';

export async function findInsureDataByAge(
  data: InsureData[],
  age: number
): Promise<InsureData> {
  return data.filter((value: InsureData) => value.Edad === age)[0];
}
