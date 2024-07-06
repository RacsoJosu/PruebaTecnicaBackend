import { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../../helpers';
import jsonData from '../../../tasas/vidaInsure.json';
import InsureData from '../interfaces/InSureData';
import { validateBodyRequestSchema } from '../helpers/schemas';
import { number, z } from 'zod';
import { calcAnnualRate, findInsureDataByAge, getRateByType } from '../helpers';


export async function seguroVidaComparadorCotizador(
  req: Request,
  res: Response
) {
  try {
    const body: z.infer<typeof validateBodyRequestSchema> =
      await validateBodyRequestSchema.parseAsync(req.body);

    const valueInsure: InsureData = await findInsureDataByAge(
      jsonData,
      body.age
    );
    const rateInsure: number = getRateByType(valueInsure, body.typeRate);
    const annualRate: number = calcAnnualRate(rateInsure, body.mountInsure);


    
    const response = new ApiResponse({
      statusCode: 200,
      message: 'Success',
      success: true,
      data: { insureRate: annualRate },
      title: 'Success',
    });

    res.status(response.statusCode).json(response);
  } catch (error) {
    throw new ApiError({
      statusCode: 500,
      message: 'Server Error',
      title: 'Error',
    });
  }
}
