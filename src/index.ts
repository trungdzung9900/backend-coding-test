import bodyParser from 'body-parser';
import express from 'express';
import buildSchemas, { db } from './schemas';

const app = express();
const port = 8010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(() => {
  buildSchemas(db);
  require('./app')(db, app);
  app.listen(port, () =>
    console.log(`App started and listening on port ${port}`)
  );
});
