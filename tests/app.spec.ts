const request = require('supertest');
const app = require('../src/app');
const req = request(app);

describe('API tests', () => {
  // before((done) => {
  //   db.serialize((err) => {
  //     if (err) {
  //       return done(err);
  //     }

  //     buildSchemas(db);

  //     done();
  //   });
  // });

  describe('GET /health', () => {
    it('should return health', (done) => {
      req.get('/health').expect('Content-Type', /text/).expect(200, done);
    });
  });
});
