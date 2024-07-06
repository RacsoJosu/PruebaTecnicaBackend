import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiError} from '../../../helpers';
import jsonData from '../../../tasas/vidaInsure.json';
import InsureData from '../interfaces/InSureData';
import { validateBodyRequestSchema } from '../helpers/schemas';
import {
  calcAnnualRate,
  findInsureDataByAge,
  getRateByGenderSmoker,
  postRequest,
} from '../helpers';
import { handlerResponse } from '../helpers/handlerResponse';

export async function seguroVidaComparadorCotizador(
  req: Request,
  res: Response
) {
  // hace el parseo del body segun, las validaciones del esquema,
  // hay un middleware que retorna erro en caso de que exista error en los datos del body
  // los datos son obligatorios
  // el valor maximo de la edad es 100
  const body: z.infer<typeof validateBodyRequestSchema> =
    await validateBodyRequestSchema.parseAsync(req.body);

  // recorre el arreglo de json para encontrar la tasa de Insure segun la edad
  const valueInsure: InsureData = await findInsureDataByAge(jsonData, body.age);

  // valida que la tasa ha sido encotrada para una respectica edad
  //en caso de encontrarla se retorna un error 404 con la edad
  if (!valueInsure) {
    throw new ApiError({
      statusCode: 404,
      message: `Not found rate with age ${body.age}`,
      title: 'Error',
    });
  }

  // obtiene el valor de la tasa dependiendo del genero y si la persona fuma o no
  const rateInsure: number = getRateByGenderSmoker(
    valueInsure,
    body.gender,
    body.smoker
  );
  const inSureAnnualRate: number = parseFloat(
    calcAnnualRate(rateInsure, body.sumAssured).toFixed(2)
  );

  const dataSeguroPlus = await postRequest({
    edad: body.age,
    sumaAsegurada: body.sumAssured,
    sexo: body.gender,
  });

  // en caso de que la peticion a la api externa devuelva un error aqui se captura y se retorna
  if (dataSeguroPlus.statusCode != 200) {
    console.log('Error');
    throw new ApiError({
      statusCode: dataSeguroPlus.statusCode,
      message: dataSeguroPlus.message,
      title: dataSeguroPlus.title,
    });
  }

  const seguroPlusAnnualRate = dataSeguroPlus.data.primaAnual;

  if (inSureAnnualRate > seguroPlusAnnualRate) {
    const response = handlerResponse(
      inSureAnnualRate,
      seguroPlusAnnualRate,
      'La mejor opción es Seguro Plus'
    );

    return res.status(response.statusCode).json(response);
  }
  if (inSureAnnualRate < seguroPlusAnnualRate) {
    const response = handlerResponse(
      inSureAnnualRate,
      seguroPlusAnnualRate,
      'La mejor opción es InSure'
    );

    return res.status(response.statusCode).json(response);
  }
  if (inSureAnnualRate == seguroPlusAnnualRate) {
    const response = handlerResponse(
      inSureAnnualRate,
      seguroPlusAnnualRate,
      'Ambas aseguradoras tienen la misma prima'
    );

    return res.status(response.statusCode).json(response);
  }
}
