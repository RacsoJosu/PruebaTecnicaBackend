import { z } from 'zod';

const Gender = z.enum(['F', 'M']);

export const validateBodyRequestSchema = z.object({
  age: z.number().int().max(100),
  gender: Gender,
  sumAssured: z.number(),
  smoker: z.boolean(),
});
