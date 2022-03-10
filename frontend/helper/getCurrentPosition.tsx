export const getCurrentPositionGeoJson = (title, lat, lng) => {

    return [{
        'type': 'Feature',
        'properties':{
            name: 'Aktuelle Position' + title,
            slug: 'current-position' + title,
            zIndex: 100,
            fill: 'black'
        },
        'geometry': {
            'type': 'Point',
            'coordinates': [
                lng,
                lat
            ]
        }
    }];

};