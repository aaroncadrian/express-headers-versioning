import {
  createProject_2020_05_01,
  createProject_2020_09_19,
} from './projects/routes/create';
import { HeaderVersioningUtil } from './header-versioning-utils';

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const versioningUtil = new HeaderVersioningUtil({
  headerKey: 'X-Version',
});

app.post(
  '/projects',
  versioningUtil.mapVersions({
    '2020-09-19': createProject_2020_09_19,
    '2020-05-01': createProject_2020_05_01,
  })
);

app.listen(4800, () => {
  console.log('Server is listening at port 4800');
});
