import { z } from 'zod';

export const StationTypeForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  plug_count: z.number(),
  efficiency: z.number(),
});
