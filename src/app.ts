import express from 'express';
import { getRoutes } from './routes';
import { Express } from './types';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

getRoutes(app);

export const App = app;