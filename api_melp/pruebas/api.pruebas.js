const request = require('supertest')
const app = require('../src/index')

/* prueba de get all productos endpoint */
describe("GET /v1/restaurants/", () => {
    it('responde con json contenido de la lista de restaurantes', done => {
        request(app)
            .get('/v1/restaurants')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
});