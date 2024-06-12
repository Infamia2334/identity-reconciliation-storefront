import express from 'express';
import {
    json as jsonParser,
    urlencoded as urlencodedParser
  } from 'body-parser';
  import config from './config/config';
import cors from 'cors';
import apiV1 from './api/v1';
import { db } from './clients/db';

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

app.use('/api/v1', apiV1);

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