import app from "../../app";
import {WELCOME_MESSAGE} from "../../constants";
const supertest = require('supertest')
const request = supertest(app)
import mongoose from 'mongoose';
import {Building} from "../../model/building";

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

    describe('delete building', ()=>{

        let buildingId:string;

        beforeEach(async ()=>{

            removeAllCollections();

            const building = new Building({
                'name':'Delete me'
            });

            await building.save();

            buildingId = building._id;

        });

        test('delete successfull', async (done)=>{

            const response = await request.get('/buildings')

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(1)

            const buildings = response.body;
            const building = buildings[0];

            expect(building.name).toBe('Delete me')

            const deleteResponse = await request.delete('/building/' + building.id);

            expect(deleteResponse.body.message).toBe('Deleted successfully');

            const responseAfter = await request.get('/buildings')

            expect(responseAfter.body.length).toBe(0);

            done();

        })

        test('delete with not existing id', async (done)=>{

            console.log(buildingId)

            const response = await request.get('/buildings')

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(1)

            const buildings = response.body;
            const building = buildings[0];

            expect(building.name).toBe('Delete me')

            const deleteResponse = await request.delete('/building/4e674ec5efc5d5071afb3caf' );

            expect(deleteResponse.body.message).toBe('building not found :(');

            const responseAfter = await request.get('/buildings')

            expect(responseAfter.body.length).toBe(1);

            done();

        })

    });

    describe('update building', ()=>{

        let buildingId:string;

        beforeEach(async ()=>{

            removeAllCollections();

            const building = new Building({
                'name':'Update me'
            });

            await building.save();

            buildingId = building._id;

        });

        test('update successfull', async (done)=>{

            const response = await request.get('/buildings')

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(1)

            const buildings = response.body;
            const building = buildings[0];

            building.name = 'Updated'

            expect(building.name).toBe('Updated')

            const updateResponse = await request.put('/building/' + building.id)
                .send(building)
            done()

            expect(updateResponse.body.message).toBe('Updated successfully');

            const responseAfter = await request.get('/buildings')

            expect(responseAfter.body.length).toBe(1);

            done();

        })

        test('delete with not existing id', async (done)=>{

            const response = await request.get('/buildings')

            expect(response.status).toBe(200)
            expect(response.body.length).toBe(1)

            const buildings = response.body;
            const building = buildings[0];

            expect(building.name).toBe('Update me')

            const updateResponse = await request.put('/building/4e674ec5efc5d5071afb3caf' );

            expect(updateResponse.body.message).toBe('building not found :(');

            const responseAfter = await request.get('/buildings')

            expect(responseAfter.body.length).toBe(1);

            done();

        })

    });

})
