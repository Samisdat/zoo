import {getDataDir, getFileNames} from "../data-helper";

describe('data-helper', () => {

    test('getDataDir - markdown', ()=>{

        expect(
            getDataDir(
                'markdown',
                'animals'
            )
        ).toBe(
            '/Users/samisdat/repos/zoo/data-repos/markdown/animals'
        );

    });

    test('getDataDir - geojson', ()=>{

        expect(
            getDataDir(
                'geojson',
                'bounding-box'
            )
        ).toBe(
            '/Users/samisdat/repos/zoo/data-repos/geojson/bounding-box'
        );

    });

    test('exceptionThrown when dataDir is not a directory', ()=>{

        expect(
            ()=>{
                getDataDir('markdown','foobar')
            }
        ).toThrow(Error);

    });

    test('getFiles', async ()=>{

        const files = await getFileNames(
            'markdown',
            'animals'
        );

        expect(files).toMatchSnapshot();

    });

});



