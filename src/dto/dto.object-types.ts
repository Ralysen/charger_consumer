import { z } from 'zod';
import { ChargingStationForm } from './dto.charging-station';
import { ConnectorForm } from './dto.connector';
import { StationTypeForm } from './dto.station-type';

export type ChargingStation = z.infer<typeof ChargingStationForm>;

export type Connector = z.infer<typeof ConnectorForm>;

export type StationType = z.infer<typeof StationTypeForm>;

export type PayLoadType = ChargingStation | Connector | StationType;
