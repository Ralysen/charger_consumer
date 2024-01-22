import { z } from 'zod';

export const ChargingStationForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  device_id: z.string().uuid(),
  ip_address: z.string().ip({ version: 'v4' }),
  firmware_version: z.string(),
});
