import joi from 'joi';

const configSchema = joi.object({
  DEFAULT_CITY: joi.string().default('Atlanta'),
  PORT: joi.number().integer().default(3000),
  REDIS_HOST: joi.string().required(),
  REDIS_PORT: joi.number().integer().default(6379),
  WEATHER_DAILY_REDIS_CACHE_TIMEOUT: joi.number().integer().default(60 * 30),
  WEATHER_API_KEY: joi.string().required(),
  WEATHER_API_URL: joi.string().required()
}).unknown();

const { error, value } = joi.validate(process.env, configSchema);

export {
  error,
  value
};
