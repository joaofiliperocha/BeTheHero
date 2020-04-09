const supertest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connect')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await supertest(app)
            .post('/ongs')
            .send(
                {
                    "name": "ONG2",
                    "email": "jjjj@sapo.com",
                    "whatsapp": "9156",
                    "city": "Barreiro",
                    "uf": "ST"
                })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})