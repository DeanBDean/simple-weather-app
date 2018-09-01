import Promise from 'bluebird';
import redis from 'redis';
import { value as config } from '../../config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const redisClient = new redis.createClient({ // eslint-disable-line new-cap
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
});
