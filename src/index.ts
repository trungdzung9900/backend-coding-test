const app = require('./app');

const port = 8010;

app.listen(port, () =>
  console.log(`App started and listening on port ${port}`)
);
