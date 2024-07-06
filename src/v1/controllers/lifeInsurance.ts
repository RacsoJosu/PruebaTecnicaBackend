import { Request, Response } from "express";
import { ApiResponse } from "../../../helpers";
import jsonData from "../../../tasas/vidaInsure.json";
import InsureData from "../interfaces/InSureData";
import { validateBodyRequestSchema } from "../helpers/schemas";
import { z } from "zod";

async function findInsureDataByAge(data: InsureData[], age: number): Promise<InsureData> {
    
    return data.filter((value: InsureData) => value.Edad === age)[0]; 
}


export async function seguroVidaComparadorCotizador(req: Request, res:Response){

    const body: z.infer<typeof validateBodyRequestSchema> = await validateBodyRequestSchema.parseAsync(req.body); 


    const valueInsure: InsureData = await findInsureDataByAge(jsonData, body.age);




    

    
    const response = new ApiResponse({
        statusCode:200,
        message: "Success",
        success:true,
        data:{valueInsure},
        title:"Success"
    });

    return res.status(response.statusCode).json(response)
}