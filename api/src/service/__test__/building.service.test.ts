import app from "../../app";
import {WELCOME_MESSAGE} from "../../constants";
const supertest = require('supertest')
const request = supertest(app)
import mongoose from 'mongoose';

describe('Buildings', () => {

    async function removeAllCollections () {
        const collections = Object.keys(mongoose.connection.collections)
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName]
            await collection.deleteMany({})
        }
    }
    beforeAll(async ()=>{

        await mongoose.connect('mongodb://mongo/jest', { useNewUrlParser: true });

        await removeAllCollections();

    })


    afterAll(async () => {
        await removeAllCollections()
    })

    test ('Gets the test endpoint', async (done) => {

        const response = await request.get('/')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe(WELCOME_MESSAGE)
        done()

    });

    test ('getAllBuildings', async (done) => {

        const response = await request.get('/buildings')

        expect(response.status).toBe(200)

        const buildings = response.body;

        expect(buildings.length).toBe(0);

        done();

    });

    test ('addNewBuilding', async done => {
        const res = await request.post('/building')
            .send({
                name: 'JEST SUPERTEST',
            })
        done()
    })

    test ('getAllBuildings', async (done) => {

        const response = await request.get('/buildings')

        expect(response.status).toBe(200)

        const buildings = response.body;

        expect(buildings.length).toBe(1)

        done();

    });

})
