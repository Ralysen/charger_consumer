import { z } from 'zod';
import { ChargingStationForm } from './dto.charging-station';
import { ConnectorForm } from './dto.connector';
import { StationTypeForm } from './dto.station-type';

export const payLoadValidator = z.discriminatedUnion('type', [
  z.object({ type: z.literal('charging_station'), body: ChargingStationForm }),
  z.object({ type: z.literal('connector'), body: ConnectorForm }),
  z.object({ type: z.literal('station_type'), body: StationTypeForm }),
]);
