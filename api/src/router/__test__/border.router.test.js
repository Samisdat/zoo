const app = require( '../../app').app;
const initMongose = require( '../../app').initMongose;

const supertest = require('supertest')

const randomString = require('../../test/random-string')
const seed = require('../../test/seed-db')

const seedData = require('../../test/seed');

const Building = require('../../model/building');

describe('Border', () => {

    let request = undefined

    beforeAll(async ()=>{

        await initMongose('mongodb://mongo/jest');

        request = supertest(app);

    });

    beforeEach( async () => {

        await seed();

    });

    test ('get all', async () => {

        const response = await request.get('/border/')

        expect(response.status).toBe(200)

        expect(response.body).toEqual(seedData.border);

    });

})
