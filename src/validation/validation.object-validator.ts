import { z } from 'zod';

class ObjectValidator {
  validate(inputObjectType: string, inputObjectBody: object) {
    switch (inputObjectType) {
      case 'charging_station': {
        const dataValidator = z.object({
          id: z.string().uuid(),
          name: z.string(),
          device_id: z.string().uuid(),
          ip_address: z.string().ip({ version: 'v4' }),
          firmware_version: z.string(),
        });

        return dataValidator.parse(inputObjectBody);
      }
      case 'connector': {
        const dataValidator = z.object({
          id: z.string().uuid(),
          name: z.string(),
          priority: z.boolean(),
        });

        return dataValidator.parse(inputObjectBody);
      }
      case 'station_type': {
        const dataValidator = z.object({
          id: z.string().uuid(),
          name: z.string(),
          plug_count: z.number(),
          efficiency: z.number(),
        });

        return dataValidator.parse(inputObjectBody);
      }
      default: {
        return null;
      }
    }
  }
}

const objectValidator = new ObjectValidator();
export default objectValidator;
