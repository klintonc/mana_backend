import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './database/index.js';

import Bill from './routes/bill.js';
import Line from './routes/line.js';
import Admin from './routes/admin.js';

const app = express();

// cannot use this below bodyParser
app.use('/', Line);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/bill', Bill);
app.use('/api/v1/admin', Admin);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

start();
