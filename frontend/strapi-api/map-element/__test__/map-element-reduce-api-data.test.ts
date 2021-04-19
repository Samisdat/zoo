import {getFixture} from "../../fixtures/get-fixture";
import {mapElementReduceApiData} from "../map-element-reduce-api-data";
import {MapElementSpore} from "../map-element-spore";

describe('mapElement reduce api data', ()=>{

    test('reduce api data', async () => {

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const dehydrated = mapElementReduceApiData(fixture);

        const expectation: MapElementSpore= {
            "id": 35,
            "title": "Elefanten Box",
            "geojson": {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            7.108079136390546,
                            51.239293806399274
                        ],
                        [
                            7.108079136390546,
                            51.23838958288827
                        ],
                        [
                            7.1095008959075985,
                            51.23838958288827
                        ],
                        [
                            7.1095008959075985,
                            51.239293806399274
                        ],
                        [
                            7.108079136390546,
                            51.239293806399274
                        ]
                    ]
                }
            },
            "type": "box"
        };

        expect(dehydrated).toStrictEqual(expectation);

    });

});