const app = require( '../../app').app;
const initMongose = require( '../../app').initMongose;

const supertest = require('supertest')

const randomString = require('../../test/random-string')
const seed = require('../../test/seed-db')

const seedData = require('../../test/seed');

const Building = require('../../model/building');

describe('Buildings', () => {

    let request = undefined

    beforeAll(async ()=>{

        await initMongose('mongodb://mongo/jest');

        request = supertest(app);

    });

    beforeEach( async () => {

        await seed();

    });

    test ('get all', async () => {

        const response = await request.get('/building/')

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(seedData.buidings);

    });

    test ('get one', async () => {

        const id = seedData.buidings[0]._id;

        const response = await request.get('/building/' + id);

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(seedData.buidings[0]);

    });

    test ('create one', async () => {

        const name = 'Jest-' + randomString();

        const response = await request.post('/building/')
            .send({
                name
            })

        expect(response.status).toBe(200)

        expect(response.body.name).toStrictEqual(name);

    })

    test ('delete one', async () => {

        const id = seedData.buidings[0]._id;

        const existingBuilding = await Building.findById(id);


        expect(existingBuilding.name).toBe(seedData.buidings[0].name);
        expect(existingBuilding._id + '').toBe(seedData.buidings[0]._id);

        const response = await request.delete('/building/' + id)

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "building with [_id=" + id + '] has been deleted'}
        );

        const ghostBuilding = await Building.findById(id);

        expect(ghostBuilding).toBeNull();
        
    });

    test ('update one', async () => {

        const response = await request.put('/building/foo')
            .send({})

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "update building with id foo"}
        );

    });

})
