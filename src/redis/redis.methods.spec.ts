import { RedisMethods } from './redis.methods';
import IORedis from 'ioredis';

describe('RedisMethods tests', () => {
  let redisMethods: RedisMethods;
  let ioRedis: IORedis;

  const mockPayLoad = {
    id: '82090efe-0482-4ae5-907e-6c043e2765df',
    name: 'Very fast charging station',
    plug_count: 2,
    efficiency: 12.12,
  };

  ioRedis = {
    get: jest.fn().mockResolvedValue(
      `{
          "id":"82090efe-0482-4ae5-907e-6c043e2765df",
          "name":"Very fast charging station",
          "plug_count":2,
          "efficiency":12.12
      }`,
    ),
    set: jest.fn(),
  } as unknown as IORedis;

  beforeEach(async () => {
    redisMethods = new RedisMethods(ioRedis);
  });

  describe('getPreviousObject method', () => {
    it('Should return previous object correctly', async () => {
      //Act
      const result = await redisMethods.getPreviousObject('test');

      //Assert
      expect(result).toStrictEqual(mockPayLoad);
    });

    it('Should return null', async () => {
      //Arrange
      jest.spyOn(ioRedis, 'get').mockResolvedValue(null);

      //Act
      const result = await redisMethods.getPreviousObject('test');

      //Assert
      expect(result).toStrictEqual(null);
    });
  });

  describe('setCacheData method', () => {
    it('Should return value correctly', async () => {
      //Act
      const result = await redisMethods.setCacheData(mockPayLoad);

      //Assert
      expect(result).toStrictEqual(mockPayLoad);
      expect(ioRedis.set).toHaveBeenCalledTimes(1);
    });

    it('Should throw error', async () => {
      //Arrange
      jest.spyOn(ioRedis, 'set').mockImplementation(() => {
        throw new Error('test');
      });

      //Assert
      expect(
        async () => await redisMethods.setCacheData(mockPayLoad),
      ).rejects.toThrow('Internal server error: Error: test');
    });
  });
});
