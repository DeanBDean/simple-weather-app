import Promise from 'bluebird';
import redis from 'redis';
import { value as config } from '../../config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const redisClient = (() => {
  if (!config.REDIS_HOST) {
    return null;
  }
  return !config.REDIS_PORT
    ? new redis.createClient(config.REDIS_HOST) // eslint-disable-line new-cap
    : new redis.createClient({ // eslint-disable-line new-cap
      host: config.REDIS_HOST,
      port: config.REDIS_PORT
    });
})();
