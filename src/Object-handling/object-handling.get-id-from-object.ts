import { AnyObject } from '../object-classes/class.any-object';

class GetIdFromObject {
  getId(obj: AnyObject): string | undefined {
    if (obj.updatedStation?.id) {
      return obj.updatedStation.id;
    } else if (obj.connector?.id) {
      return obj.connector.id;
    } else if (obj.stationType?.id) {
      return obj.stationType.id;
    }
    return undefined;
  }
}
const getIdFromObject = new GetIdFromObject();
export default getIdFromObject;
