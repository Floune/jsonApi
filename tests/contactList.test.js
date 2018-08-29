const request = require('supertest');
const app = require('../routes')
describe('Test the contact display patch', () => {
    test('It should response the POST method', () => {
        return request(app).post("/api/contacts").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
})