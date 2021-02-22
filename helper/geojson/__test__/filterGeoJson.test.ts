import {FeatureCollection} from "geojson";
import {filterGeoJson} from "../filterGeoJson";

describe('filterGeoJson', () => {

    let collection: FeatureCollection;

    beforeEach(()=>{

        collection = {
            type:'FeatureCollection',
            features:[
                {
                    type: 'Feature',
                    geometry: {
                        type: "LineString",
                        coordinates:[]
                    },
                    properties: {
                        name: 'findme',
                        type:'bounding-box'
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: "LineString",
                        coordinates:[]
                    },
                    properties: {
                        name: 'dont-findme',
                        type:'some-other-type'
                    },
                }
            ]
        };

    });

    it('return features with specified type',  () => {

        expect(collection.features.length).toBe(2);

        const filteredCollection = filterGeoJson('bounding-box', collection);

        expect(filteredCollection.length).toBe(1);

        expect(filteredCollection[0].properties?.name).toBe('findme');

    });

    it('can handle missing type in feature.properties',  () => {

        const collectionMissingType = {
            ...collection
        };

        delete collectionMissingType.features[0].properties;

        expect(collectionMissingType.features.length).toBe(2);
        expect(collectionMissingType.features[0].properties).toBeUndefined();

        const filteredCollection = filterGeoJson('bounding-box', collectionMissingType);

        expect(filteredCollection.length).toBe(0);

    });


});



