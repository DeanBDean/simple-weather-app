import express from 'express';
import axios from 'axios';
import { logger } from '../logger';
import { redisClient } from '../services/redis';
import { value as config } from '../../config';
import { createQueryParamString } from './queryHelpers';

const instance = axios.create({
  baseURL: config.WEATHER_API_URL,
  params: {
    apikey: config.WEATHER_API_KEY,
    mode: 'json',
    units: 'imperial'
  }
});

export const weather = express.Router();

export const handleRequestInterceptor = async (request) => {
  if (request.method === 'get') {
    const url = `${request.baseURL.slice(0, -1)}${request.url}${createQueryParamString(request.params)}`;
    try {
      const cachedReply = await redisClient.getAsync(url);
      if (cachedReply) {
        const cachedReplyJSON = JSON.parse(cachedReply);
        request.data = cachedReplyJSON;
        request.adapter = function myCustomAdapter() {
          return Promise.resolve({
            data: cachedReplyJSON,
            status: request.status,
            statusText: request.statusText,
            headers: request.headers,
            config: request,
            request
          });
        };
      }
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  }

  return request;
};

export const handleResponseInterceptor = (response) => {
  if (response.config.method === 'get' && response.config.adapter.name !== 'myCustomAdapter') {
    redisClient.setex(`${response.config.url}${createQueryParamString(response.config.params)}`, config.WEATHER_DAILY_REDIS_CACHE_TIMEOUT, JSON.stringify(response.data));
  }

  return response;
};

instance.interceptors.request.use(handleRequestInterceptor, error => Promise.reject(error));
instance.interceptors.response.use(handleResponseInterceptor, error => Promise.reject(error));

export const handleDailyRoute = async (req, res) => {
  const city = req.params.city || config.DEFAULT_CITY;
  try {
    const weatherResults = await instance.get('/forecast/daily', {
      params: {
        q: city
      }
    });

    res.json({
      data: weatherResults.data
    });
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

weather.get('/daily', handleDailyRoute);
