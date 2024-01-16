import { AnyObject } from "redis-object-interface";

class GetIdFromObject {
    getId(obj: AnyObject): string | undefined {
    if (obj.updatedStation && obj.updatedStation.id) {
        return obj.updatedStation.id;
    } else if (obj.connector && obj.connector.id) {
        return obj.connector.id;
    } else if (obj.stationType && obj.stationType.id) {
        return obj.stationType.id;
    }
    return undefined;
    }
}
const getIdFromObject = new GetIdFromObject();
export default getIdFromObject;