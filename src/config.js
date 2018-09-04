import joi from 'joi';

const configSchema = joi.object({
  DEFAULT_CITY: joi.string().default('Atlanta'),
  DEFAULT_UNITS: joi.string().default('imperial'),
  NODE_ENV: joi.string().default('production'),
  PORT: joi.number().integer().default(3000),
  REDIS_HOST: joi.string().optional().allow(''),
  REDIS_PORT: joi.number().integer().optional().allow(''),
  WEATHER_DAILY_REDIS_CACHE_TIMEOUT: joi.number().integer().default(60 * 30),
  WEATHER_API_KEY: joi.string().required(),
  WEATHER_API_URL: joi.string().required()
}).unknown();

const { error, value } = joi.validate(process.env, configSchema);

export {
  error,
  value
};
