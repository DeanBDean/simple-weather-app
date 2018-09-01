import express from 'express';
import { weather } from './weather';

export const api = express.Router();

api.use('/weather', weather);
