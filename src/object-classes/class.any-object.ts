import { ChargingStationType } from './class.charging-station';
import { Connector } from './class.connector';
import { StationType } from './class.station-type';

export class AnyObject {
  updatedStation?: ChargingStationType;
  connector?: Connector;
  stationType?: StationType;
}
