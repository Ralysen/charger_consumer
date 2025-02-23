import { z } from 'zod';
import { ChargingStationForm } from './charging-station.dto';
import { ConnectorForm } from './connector.dto';
import { StationTypeForm } from './station-type.dto';

export const payLoadUnion = z.discriminatedUnion('type', [
  z.object({ type: z.literal('charging_station'), body: ChargingStationForm }),
  z.object({ type: z.literal('connector'), body: ConnectorForm }),
  z.object({ type: z.literal('station_type'), body: StationTypeForm }),
]);
