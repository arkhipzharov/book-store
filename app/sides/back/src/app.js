import express from 'express';
import { moduleName } from '@back/module';
import * as hl from '@back/helpers';
import * as h from '@/utils/helpers';

const app = express();

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.listen(3000, async () => {
  console.log('Example app listening on port 3000');
  console.log(moduleName);
  console.log('sum of 2 and 5 ->', hl.sum(2, 5));
  await h.delay(5000);
  console.log('end');
});
