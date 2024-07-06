export function calcAnnualRate(rate: number, mountInsure: number) {
  console.log({ rate, mountInsure });
  return (rate / 1000) * mountInsure;
}
