import { Request, Response } from 'express';
import { z } from 'zod';

import PostData from '../interfaces/PostData';
import { ApiError, ApiResponse } from '../../../helpers';
import jsonData from '../../../tasas/vidaInsure.json';
import InsureData from '../interfaces/InSureData';
import { validateBodyRequestSchema } from '../helpers/schemas';
import {
  calcAnnualRate,
  findInsureDataByAge,
  getRateByGenderSmoker,
  postRequest,
} from '../helpers';

export async function seguroVidaComparadorCotizador(
  req: Request,
  res: Response
) {
  const body: z.infer<typeof validateBodyRequestSchema> =
    await validateBodyRequestSchema.parseAsync(req.body);

  const valueInsure: InsureData = await findInsureDataByAge(jsonData, body.age);


  const rateInsure: number = getRateByGenderSmoker(
    valueInsure,
    body.gender,
    body.smoker
  );
  const annualRate: number = calcAnnualRate(rateInsure, body.mountInsure);

  const dataSeguroPlus = await postRequest({
    data: {
      edad: body.age,
      sumaAsegurada: body.mountInsure,
      sexo: 'F',
    },
  });

  if (dataSeguroPlus.statusCode != 200) {
    throw new ApiError({
      statusCode: dataSeguroPlus.statusCode,
      message: dataSeguroPlus.message,
      title: dataSeguroPlus.title,
    });
  }

  const response = new ApiResponse({
    statusCode: 200,
    message: 'Success',
    success: true,
    data: { insureRate: annualRate, dataSeguroPlus },
    title: 'Success',
  });

  res.status(response.statusCode).json(response);
}
