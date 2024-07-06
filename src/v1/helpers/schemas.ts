import { z } from 'zod';

export const validateBodyRequestSchema = z.object({
  age: z.number().int(),
  typeRate: z.string(),
});
