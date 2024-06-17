import express from 'express';
import {
    json as jsonParser,
    urlencoded as urlencodedParser
  } from 'body-parser';
  import config from './config/config';
import cors from 'cors';
import apiV1 from './api/v1';
import { db } from './clients/db';
import { ApiError } from './customError.ts/apiError';
import { errorHandler } from './middlewares/errorHandler';
import chalk from 'chalk';

const app = express();

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200
    })
);

app.use(
    jsonParser({
      type: 'application/json'
    })
);
  
  app.use(
    urlencodedParser({
      extended: true
    })
);

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use((req, _, next) => {
  // Logger - Can Be replaced with winston or morgan
  console.log(chalk.yellow('='.repeat(100)));
  const query = JSON.stringify(req.query, null, 2);
  const path = `[${req.method}] ${req.path} ${new Date().toUTCString()}`;
  console.log(chalk.green(path));
  console.log(chalk.blue(`Query Params ${query}\n`));

  return next();
});

app.use('/api/v1', apiV1);

app.all('*', (req, res, next) => {
  next(new ApiError(404, 'Not Found'));
});

app.use(errorHandler);

const PORT  = config.PORT as number

app.listen(PORT, async () => {
    try {
        await db.connect();
        console.log(`Server Started at port ${config.PORT}\nDatabase connected successfully`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
});

export default app;