const express = require('express');
const { createProject_2020_05_01 } = require('./projects/routes/create');

const app = express();

app.post('/projects', createProject_2020_05_01);

app.listen(4800, () => {
  console.log('Server is listening at port 4800');
});
