import {getFixture} from "./fixtures/get-fixture";
import {MapElement, reduceMapElementApiData} from "../map-element";
import {MapElementDehydrated} from "../dehydrated-interfaces/map-element";

describe('mapElement value object', ()=>{

    test('reduce api data', async () => {

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const dehydrated = reduceMapElementApiData(fixture);

        const expectation: MapElementDehydrated = {
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

    test('create mapElement value object from api json', async ()=>{

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const mapElement = MapElement.fromApi(fixture);

        expect(mapElement.id).toBe(35);

    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const mapElementFromApi = MapElement.fromApi(fixture);

        const dehydrated = mapElementFromApi.dehydrate();

        const mapElement = MapElement.hydrate(dehydrated);

        expect(mapElement.id).toBe(35);


    });

    test('create map-element value object from dehydrated json',()=>{
        
        const facility = MapElement.hydrate({
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
        });

        expect(facility.id).toBe(35);

    });

});