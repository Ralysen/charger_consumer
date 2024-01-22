import { z } from 'zod';

export const ConnectorForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  priority: z.boolean(),
});
