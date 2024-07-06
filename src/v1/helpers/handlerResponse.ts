import { ApiResponse } from '../../../helpers';

function formatAnualValue(value: number) {
    return Math.round(value * 100) / 100;
}

export function handlerResponse(
  inSureAnnualRate: number,
  seguroPlusAnnualRate: number,
  message: string
) {
  return new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    title: 'Success',
    data: {
      inSureAnnualRate: formatAnualValue(inSureAnnualRate),
      seguroPlusAnnualRate: formatAnualValue(seguroPlusAnnualRate),
      message,
    },
  });
}
