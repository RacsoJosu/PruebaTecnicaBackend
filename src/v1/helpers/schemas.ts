import { z } from 'zod';

const RateTypes = z.enum([
  'hombreFumador',
  'hombreNoFumador',
  'mujerNoFumadora',
  'mujerFumadora',
]);

export const validateBodyRequestSchema = z.object({
  age: z.number().int(),
  typeRate: RateTypes,
  mountInsure: z.number()
});
