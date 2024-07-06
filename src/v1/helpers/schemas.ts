import { z } from 'zod';

const Gender = z.enum([
  'F',
  'M'
]);

export const validateBodyRequestSchema = z.object({
  age: z.number().int(),
  gender: Gender,
  mountInsure: z.number(),
  smoker: z.boolean()
});
