const express = require('express');
import {
  createProject_2020_05_01,
  createProject_2020_09_19,
} from './projects/routes/create';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/projects', (req, res) => {
  const version = req.header('X-Version');

  if (version === '2020-09-19') {
    createProject_2020_09_19(req, res);
  } else {
    createProject_2020_05_01(req, res);
  }
});

app.listen(4800, () => {
  console.log('Server is listening at port 4800');
});
