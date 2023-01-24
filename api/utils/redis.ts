import Redis from "ioredis";
require("dotenv").config();

const redisClient = new Redis();

// function getOrSetCache(key: string, cb: () => void) {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, async (error: any, data: any) => {
//       if (error) return reject(error);
//       if (data != null) return resolve(JSON.parse(data));
//       const freshData = await cb();
//       redisClient.setex(key, 60, JSON.stringify(freshData));
//       resolve(freshData);
//     });
//   });
// }

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
