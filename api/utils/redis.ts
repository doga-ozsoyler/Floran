import Redis from "ioredis";
import RedisTest from "ioredis-mock";

// By default, it will connect to localhost:6379.
const redisClient =
  process.env.NODE_ENV !== "TEST" ? new Redis() : new RedisTest();

export const getOrSetCache = async (
  key: string,
  cb: () => any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error: any, data: any) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));

      const freshData = await cb();
      redisClient.setex(key, 60, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
};

export const deleteKeyInCache = async (key: string) => {
  redisClient.del(key);
};
