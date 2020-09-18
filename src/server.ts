import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes';
import './database';

const app = express();

dotenv.config();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server Started!');
});
