import {getFixture} from '../../fixtures/get-fixture';
import {markerReduceApiData} from '../map-element-reduce-api-data';
import {MarkerSpore} from '../map-element-spore';

describe('mapElement reduce api data', () => {

    test('reduce api data', async () => {

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const mapElementSpore = markerReduceApiData(fixture);

        const expectation: MarkerSpore = {
            id: 35,
            title: 'Elefanten Box',
            geojson: {
                type: 'Feature',
                geometry: {
                    'type': 'LineString',
                    'coordinates': [[7.108079136390546, 51.239293806399274], [7.108079136390546, 51.23838958288827], [7.1095008959075985, 51.23838958288827], [7.1095008959075985, 51.239293806399274], [7.108079136390546, 51.239293806399274]]
                }
            },
            type: 'box',
            facility: {
                id: 13,
                slug: 'elefanten',
                title: 'Elefanten',
                body: 'Some Content\n',
                type: 'enclosure'
            }
        };

        expect(mapElementSpore).toStrictEqual(expectation);

    });

});