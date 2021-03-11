import {getDataDir} from "../data-helper";

describe('data-helper', () => {

    test('getDataDir', ()=>{

        expect(
            getDataDir('animals')
        ).toBe(
            '/Users/samisdat/repos/zoo/data-repos/markdown/animals'
        );

    });

    test('exceptionThrown when dataDir is not a directory', ()=>{

        expect(
            ()=>{
                getDataDir('foobar')
            }
        ).toThrow(Error);

    });

});



