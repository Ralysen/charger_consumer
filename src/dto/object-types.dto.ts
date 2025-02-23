import { z } from 'zod';
import { ChargingStationForm } from './charging-station.dto';
import { ConnectorForm } from './connector.dto';
import { StationTypeForm } from './station-type.dto';

export type ChargingStation = z.infer<typeof ChargingStationForm>;

export type Connector = z.infer<typeof ConnectorForm>;

export type StationType = z.infer<typeof StationTypeForm>;

export type PayLoadType = ChargingStation | Connector | StationType;
