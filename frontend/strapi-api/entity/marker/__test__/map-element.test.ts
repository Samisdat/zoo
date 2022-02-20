import {getFixture} from "../../fixtures/get-fixture";
import {Marker, MapElementProperties} from "../map-element";

describe('mapElement value object', ()=>{

    test('create mapElement value object from api json', async ()=>{

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const mapElement = Marker.fromApi(fixture);

        expect(mapElement.id).toBe(35);
        expect(mapElement.type).toBe('Feature');


        const mapElementProperties: MapElementProperties = {
            name: 'Elefanten Box',
            type: 'box',
            facility: {
                body: "Some Content\n",
                id: 13,
                slug: "elefanten",
                title: "Elefanten",
                type: "enclosure",
            },
        };

        expect(mapElement.properties).toStrictEqual(mapElementProperties);
        expect(mapElement.geometry).toStrictEqual(fixture.geojson.geometry);

    });

    test('can by created by api data, dehydrated and hydrated again', async ()=>{

        const fixture = await getFixture('map-element', 'elefantenanlage.json');

        const mapElementFromApi = Marker.fromApi(fixture);

        const dehydrated = mapElementFromApi.dehydrate();

        const mapElement = Marker.hydrate(dehydrated);

        expect(mapElement.id).toBe(35);


    });

    test('create map-element value object from dehydrated json',()=>{
        
        const facility = Marker.hydrate({
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