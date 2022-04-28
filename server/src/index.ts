require('dotenv').config();
const express = require('express');
const pool = require('./db');
const router = require('./routes/index.ts');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/errorHandlingMiddleware');
import * as path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

//error middleware
app.use(errorHandler);

const start = async () => {
  try {
    await pool;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
