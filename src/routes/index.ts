import { Express } from '../types';
import { getAdminRoutes } from './admin.route';
import express from 'express';

export const getRoutes = (app: Express) => {
  app.use('/admin', getAdminRoutes(express.Router()));
};
