const express = require('express');
import {
  createProject_2020_05_01,
  createProject_2020_09_19,
} from './projects/routes/create';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/projects', (req, res, next) => {
  const version = req.header('X-Version');

  const versionMap = {
    '2020-09-19': createProject_2020_09_19,
    '2020-05-01': createProject_2020_05_01,
  };

  const handler = versionMap[version];

  if (!handler) {
    res.status(403).json({
      error: `Unsupported Version: ${version}`,
    });

    return;
  }

  handler(req, res, next);
});

app.listen(4800, () => {
  console.log('Server is listening at port 4800');
});
