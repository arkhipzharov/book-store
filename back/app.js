import express from 'express';
import { moduleName, getModuleName } from './module';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log(getModuleName(), moduleName);
  console.log('Example app listening on port 3000');
});
