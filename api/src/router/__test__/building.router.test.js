const app = require( '../../app');

const supertest = require('supertest')
const request = supertest(app)

describe('Buildings', () => {

    test ('get all', async () => {

        const response = await request.get('/building/')

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "show all buildings"}
        );

    });

    test ('get one', async () => {

        const response = await request.get('/building/foo')

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "show building with id foo"}
        );

    });

    test ('create one', async () => {
        const response = await request.post('/building/')
            .send({
                name: 'Jest',
            })


        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "create a building"}
        );

    })

    test ('delete one', async () => {

        const response = await request.delete('/building/foo')

        expect(response.status).toBe(200)

        expect(response.body).toStrictEqual(
            {"message": "delete building with id foo"}
        );

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
