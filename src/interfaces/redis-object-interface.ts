import { ChargingStationType } from 'charging-station-interface';
import { Connector } from 'connector-interface';
import { StationType } from 'station-type-interface';

export class AnyObject {
  updatedStation?: ChargingStationType;
  connector?: Connector;
  stationType?: StationType;
}
