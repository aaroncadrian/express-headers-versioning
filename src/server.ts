const express = require('express');
const { createProject_2020_05_01 } = require('./projects/routes/create');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/projects', createProject_2020_05_01);

app.listen(4800, () => {
  console.log('Server is listening at port 4800');
});
