import { z } from 'zod';

export const ChargingStationForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  device_id: z.string().uuid(),
  ip_address: z.string().ip({ version: 'v4' }),
  firmware_version: z.string(),
});

export const ConnectorForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  priority: z.boolean(),
});

export const StationTypeForm = z.object({
  id: z.string().uuid(),
  name: z.string(),
  plug_count: z.number(),
  efficiency: z.number(),
});

export const payLoadValidator = z.discriminatedUnion('type', [
  z.object({ type: z.literal('charging_station'), body: ChargingStationForm }),
  z.object({ type: z.literal('connector'), body: ConnectorForm }),
  z.object({ type: z.literal('station_type'), body: StationTypeForm }),
]);
