/**
 * @jest-environment jsdom
 */

describe('BasketCardComponent', () => {


    beforeAll(() => {

        console.log('beforeAll');

    });

    beforeEach(() => {

        console.log('beforeEach');

    });

    test ('One test', () => {

        const foo:string = 'bar';

        expect(foo).toBe('bar');

    });

    test.todo('foobar');

});
