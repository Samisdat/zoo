import {graphql} from 'msw'
import {QrCodeById, QrCodes} from './handler/qr-code/QrCodeById';
import {IndividualAnimalsBySlug} from './handler/individual-animal/IndividualAnimalsBySlug';
import {AnimalsBySlug} from './handler/animal/AnimalsBySlug';
import {IndividualAnimals} from './handler/individual-animal/IndividualAnimals';
import {Nodes} from './handler/node/Nodes';
import {Edges} from './handler/edge/Nodes';
import {Markers} from './handler/marker/Markers';
import {Facilities, FacilitiesBySlug} from './handler/facilities/Facilities';

export const handlers = [

    graphql.query('PostSlugs', (request, response, context) => {

            return response(
                context.data({
                    posts: {
                        data: [{
                            id:5,
                            attributes:{
                                title: 'title',
                                slug: 'slug',
                                date: 'date',
                                body: 'body',
                                media: {
                                    'headerImage': {
                                        'data': {
                                            'id': '25',
                                            'attributes': {
                                                'name': 'drill_d1860953ec.jpeg',
                                                'x': 31,
                                                'y': 64,
                                                'formats': {
                                                    'thumbnail': {
                                                        'name': 'thumbnail_drill_d1860953ec.jpeg',
                                                        'hash': 'thumbnail_drill_d1860953ec_0c73b91c65',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 234,
                                                        'height': 156,
                                                        'size': 5.31,
                                                        'url': '/uploads/thumbnail_drill_d1860953ec_0c73b91c65.jpeg'
                                                    },
                                                    'large': {
                                                        'name': 'large_drill_d1860953ec.jpeg',
                                                        'hash': 'large_drill_d1860953ec_0c73b91c65',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 1000,
                                                        'height': 668,
                                                        'size': 82.62,
                                                        'url': '/uploads/large_drill_d1860953ec_0c73b91c65.jpeg'
                                                    },
                                                    'medium': {
                                                        'name': 'medium_drill_d1860953ec.jpeg',
                                                        'hash': 'medium_drill_d1860953ec_0c73b91c65',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 750,
                                                        'height': 501,
                                                        'size': 46.35,
                                                        'url': '/uploads/medium_drill_d1860953ec_0c73b91c65.jpeg'
                                                    },
                                                    'small': {
                                                        'name': 'small_drill_d1860953ec.jpeg',
                                                        'hash': 'small_drill_d1860953ec_0c73b91c65',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 500,
                                                        'height': 334,
                                                        'size': 20.75,
                                                        'url': '/uploads/small_drill_d1860953ec_0c73b91c65.jpeg'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }],
                    },
                }),
            )

    }),
    graphql.query('PostsBySlug', (request, response, context) => {

        if('an-existing-slug' === request.variables.slug){
            return response(
                context.data({
                    posts: {
                        "data": [
                            {
                                "id": "7",
                                "attributes": {
                                    "title": "Spendenübergabe der besonderen Art",
                                    "slug": "spenden-uebergabe-der-besonderen-art",
                                    "date": "2022-07-05",
                                    "content": [
                                        {
                                            "__typename": "ComponentContentHeadline",
                                            "headline": "Überschrift",
                                            "level": "h1"
                                        },
                                        {
                                            "__typename": "ComponentContentText",
                                            "text": "Vergangenen Donnerstag durften wir die Kindertagesstätte Lindenhof e. V. Solingen im Grünen Zoo Wuppertal begrüßen. Der Ausflug hatte für die Kinder der Roten Gruppe eine ganz besondere Bedeutung denn sie hatten sich im Vorfeld zu ihrem Zoobesuch intensiv mit dem Thema „Pinguine“ und Umweltschutz beschäftigt.\n\nDie Kinder zeigten ein so großes Interesse an den Pinguinen, dass sie zahlreiche Bilder malten und Figuren bastelten. Es kam die Idee auf, eine kleine Vernissage in der KiTa zu veranstalten, bei der die Kinder ihre Kunstwerke zur Schau stellen konnten. Die Kinder haben so auch auf das Thema Artenschutz und Klimaschutz aufmerksam gemacht und bei der Veranstaltung zahlreiche Spenden gesammelt.\n\nBei dem Besuch im Grünen Zoo Wuppertal hat die Gruppe ihre gesammelten Spenden in Höhe von 276,42 € in einer selbstgebastelten Pinguin-Spardose an den Zoo-Verein Wuppertal e.V. überreicht. Der Förderverein des Zoos hat erst kürzlich mit Hilfe von Spenden eine neue klimafreundlichere Beleuchtungsanlage im Haus der Königs- und Eselspinguine finanziert, die sich außerdem positiv auf das Verhalten der Pinguine auswirken soll.\n\nNach der Übergabe der Spenden, für die sich der Zoo-Verein herzlich bedankt, durften die Kinder nun endlich die Pinguine besuchen. Als besonderes Extra haben die Kinder der Roten Gruppe in sicherem Abstand die Fütterung der Pinguine übernommen, was für große Freude im ganzen Team sorgte und sicher lange in Erinnerung bleibt.\n\nDie Rote Gruppe der KiTa Lindenhof ist ein tolles Vorbild, über das wir dankend berichten dürfen.\n\n"
                                        },
                                        {
                                            "__typename": "ComponentContentImage",
                                            "align": "fullsize",
                                            "images": {
                                                "data": [
                                                    {
                                                        "id": "92",
                                                        "attributes": {
                                                            "name": "20220705_123259.jpeg",
                                                            "caption": "20220705_123259.jpeg",
                                                            "alternativeText": "20220705_123259.jpeg",
                                                            "copyright": "Grüner Zoo Wuppertal",
                                                            "x": null,
                                                            "y": null,
                                                            "formats": {
                                                                "thumbnail": {
                                                                    "name": "thumbnail_20220705_123259.jpeg",
                                                                    "hash": "thumbnail_20220705_123259_d5028d9bd4",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 117,
                                                                    "height": 156,
                                                                    "size": 3.39,
                                                                    "url": "/uploads/thumbnail_20220705_123259_d5028d9bd4.jpeg"
                                                                },
                                                                "large": {
                                                                    "name": "large_20220705_123259.jpeg",
                                                                    "hash": "large_20220705_123259_d5028d9bd4",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 750,
                                                                    "height": 1000,
                                                                    "size": 49.25,
                                                                    "url": "/uploads/large_20220705_123259_d5028d9bd4.jpeg"
                                                                },
                                                                "medium": {
                                                                    "name": "medium_20220705_123259.jpeg",
                                                                    "hash": "medium_20220705_123259_d5028d9bd4",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 563,
                                                                    "height": 750,
                                                                    "size": 31.07,
                                                                    "url": "/uploads/medium_20220705_123259_d5028d9bd4.jpeg"
                                                                },
                                                                "small": {
                                                                    "name": "small_20220705_123259.jpeg",
                                                                    "hash": "small_20220705_123259_d5028d9bd4",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 375,
                                                                    "height": 500,
                                                                    "size": 16.9,
                                                                    "url": "/uploads/small_20220705_123259_d5028d9bd4.jpeg"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "id": "93",
                                                        "attributes": {
                                                            "name": "20220705_123359.jpeg",
                                                            "caption": "20220705_123359.jpeg",
                                                            "alternativeText": "20220705_123359.jpeg",
                                                            "copyright": "Grüner Zoo Wuppertal",
                                                            "x": null,
                                                            "y": null,
                                                            "formats": {
                                                                "thumbnail": {
                                                                    "name": "thumbnail_20220705_123359.jpeg",
                                                                    "hash": "thumbnail_20220705_123359_8f0e1d35eb",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 117,
                                                                    "height": 156,
                                                                    "size": 4.86,
                                                                    "url": "/uploads/thumbnail_20220705_123359_8f0e1d35eb.jpeg"
                                                                },
                                                                "large": {
                                                                    "name": "large_20220705_123359.jpeg",
                                                                    "hash": "large_20220705_123359_8f0e1d35eb",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 750,
                                                                    "height": 1000,
                                                                    "size": 82.47,
                                                                    "url": "/uploads/large_20220705_123359_8f0e1d35eb.jpeg"
                                                                },
                                                                "medium": {
                                                                    "name": "medium_20220705_123359.jpeg",
                                                                    "hash": "medium_20220705_123359_8f0e1d35eb",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 563,
                                                                    "height": 750,
                                                                    "size": 52.11,
                                                                    "url": "/uploads/medium_20220705_123359_8f0e1d35eb.jpeg"
                                                                },
                                                                "small": {
                                                                    "name": "small_20220705_123359.jpeg",
                                                                    "hash": "small_20220705_123359_8f0e1d35eb",
                                                                    "ext": ".jpeg",
                                                                    "mime": "image/jpeg",
                                                                    "path": null,
                                                                    "width": 375,
                                                                    "height": 500,
                                                                    "size": 27.52,
                                                                    "url": "/uploads/small_20220705_123359_8f0e1d35eb.jpeg"
                                                                }
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "headerImage": {
                                        "data": {
                                            "id": "96",
                                            "attributes": {
                                                "name": "IMG_2242.jpeg",
                                                "x": null,
                                                "y": null,
                                                "copyright": "Grüner Zoo Wuppertal",
                                                "formats": {
                                                    "thumbnail": {
                                                        "name": "thumbnail_IMG_2242.jpeg",
                                                        "hash": "thumbnail_IMG_2242_e2c823e99a",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 117,
                                                        "height": 156,
                                                        "size": 7.99,
                                                        "url": "/uploads/thumbnail_IMG_2242_e2c823e99a.jpeg"
                                                    },
                                                    "large": {
                                                        "name": "large_IMG_2242.jpeg",
                                                        "hash": "large_IMG_2242_e2c823e99a",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 750,
                                                        "height": 1000,
                                                        "size": 241.51,
                                                        "url": "/uploads/large_IMG_2242_e2c823e99a.jpeg"
                                                    },
                                                    "medium": {
                                                        "name": "medium_IMG_2242.jpeg",
                                                        "hash": "medium_IMG_2242_e2c823e99a",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 563,
                                                        "height": 750,
                                                        "size": 138.19,
                                                        "url": "/uploads/medium_IMG_2242_e2c823e99a.jpeg"
                                                    },
                                                    "small": {
                                                        "name": "small_IMG_2242.jpeg",
                                                        "hash": "small_IMG_2242_e2c823e99a",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 375,
                                                        "height": 500,
                                                        "size": 65.51,
                                                        "url": "/uploads/small_IMG_2242_e2c823e99a.jpeg"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]

                    },
                }),
            )
        }

        if('an-existing-slug-no-header-image' === request.variables.slug){
            return response(
                context.data({
                    posts: {
                        data: [{
                            id:15,
                            attributes:{
                                title: 'title',
                                slug: 'slug',
                                date: 'date',
                                body: 'body',
                                media: null
                            }
                        }],
                    },
                }),
            )
        }

    }),

    graphql.query('Facilities', Facilities),
    graphql.query('FacilitiesBySlug', FacilitiesBySlug),

    graphql.query('Animals', (request, response, context) => {

        return response(
            context.data({
                'animals': {
                    'data': [
                        {
                            'id': '1',
                            'attributes': {
                                'title': 'Afrikanischer Elefant',
                                'slug': 'afrikanischer-elefant',
                                'body': '\nI am content.\n',
                                'wikidata': 'Q36557',
                                'wikipediaLink': 'https://de.wikipedia.org/wiki/Afrikanischer_Elefant',
                                'scientificName': 'Loxodonta africana',
                                'iucnID': '181008073',
                                'iucnLink': 'https://apiv3.iucnredlist.org/api/v3/taxonredirect/181008073',
                                'iucnStatus': 'VU',
                                'className': 'Säugetiere',
                                'order': 'Rüsseltiere',
                                'species': 'Afrikanischer Elefant',
                                'family': 'Elefanten',
                                'media': {
                                    'headerImage': {
                                        'data': {
                                            'id': '16',
                                            'attributes': {
                                                'name': 'African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                                                'x': null,
                                                'y': null,
                                                'formats': {
                                                    'thumbnail': {
                                                        'name': 'thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                                                        'hash': 'thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 234,
                                                        'height': 156,
                                                        'size': 8.27,
                                                        'url': '/uploads/thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg'
                                                    },
                                                    'large': {
                                                        'name': 'large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                                                        'hash': 'large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 1000,
                                                        'height': 667,
                                                        'size': 110.04,
                                                        'url': '/uploads/large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg'
                                                    },
                                                    'medium': {
                                                        'name': 'medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                                                        'hash': 'medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 750,
                                                        'height': 500,
                                                        'size': 65.62,
                                                        'url': '/uploads/medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg'
                                                    },
                                                    'small': {
                                                        'name': 'small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg',
                                                        'hash': 'small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 500,
                                                        'height': 333,
                                                        'size': 31.11,
                                                        'url': '/uploads/small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            'id': '2',
                            'attributes': {
                                'title': 'Afrikanischer Esel',
                                'slug': 'afrikanischer-esel',
                                'body': '\nI am content.\n',
                                'wikidata': 'Q208140',
                                'wikipediaLink': 'https://de.wikipedia.org/wiki/Afrikanischer_Esel',
                                'scientificName': 'Equus africanus',
                                'iucnID': '7949',
                                'iucnLink': 'https://apiv3.iucnredlist.org/api/v3/taxonredirect/7949',
                                'iucnStatus': 'CR',
                                'className': 'Säugetiere',
                                'order': 'Unpaarhufer',
                                'species': 'Afrikanischer Esel',
                                'family': 'Pferde',
                                'media': {
                                    'headerImage': {
                                        'data': {
                                            'id': '79',
                                            'attributes': {
                                                'name': 'Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg',
                                                'x': null,
                                                'y': null,
                                                'formats': {
                                                    'thumbnail': {
                                                        'name': 'thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg',
                                                        'hash': 'thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 208,
                                                        'height': 156,
                                                        'size': 7.67,
                                                        'url': '/uploads/thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg'
                                                    },
                                                    'large': {
                                                        'name': 'large_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg',
                                                        'hash': 'large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 1000,
                                                        'height': 750,
                                                        'size': 125.5,
                                                        'url': '/uploads/large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg'
                                                    },
                                                    'medium': {
                                                        'name': 'medium_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg',
                                                        'hash': 'medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 750,
                                                        'height': 563,
                                                        'size': 74.54,
                                                        'url': '/uploads/medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg'
                                                    },
                                                    'small': {
                                                        'name': 'small_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg',
                                                        'hash': 'small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be',
                                                        'ext': '.jpeg',
                                                        'mime': 'image/jpeg',
                                                        'path': null,
                                                        'width': 500,
                                                        'height': 375,
                                                        'size': 35.02,
                                                        'url': '/uploads/small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            'id': '3',
                            'attributes': {
                                'title': 'Anden-Felsenhahn',
                                'slug': 'anden-felsenhahn',
                                'body': '\nI am content.\n',
                                'wikidata': 'Q490393',
                                'wikipediaLink': 'https://de.wikipedia.org/wiki/Andenfelsenhahn',
                                'scientificName': 'Rupicola peruvianus',
                                'iucnID': '22700974',
                                'iucnLink': 'https://apiv3.iucnredlist.org/api/v3/taxonredirect/22700974',
                                'iucnStatus': 'LC',
                                'className': 'Vögel',
                                'order': 'Sperlingsvögel',
                                'species': 'Anden-Felsenhahn',
                                'family': 'Schmuckvögel',
                                'media': null
                            }
                        }
                    ]
                }
            }),
        )
    }),
    /*
    graphql.query('AnimalsBySlug', (request, response, context) => {

        if('an-existing-slug' === request.variables.slug){
            return response(
                context.data({
                        "animals": {
                            "data": [
                                {
                                    "id": "1",
                                    "attributes": {
                                        "title": "Afrikanischer Elefant",
                                        "slug": "afrikanischer-elefant",
                                        "body": "\nI am content.\n",
                                        "wikidata": "Q36557",
                                        "wikipediaLink": "https://de.wikipedia.org/wiki/Afrikanischer_Elefant",
                                        "scientificName": "Loxodonta africana",
                                        "iucnID": "181008073",
                                        "iucnLink": "https://apiv3.iucnredlist.org/api/v3/taxonredirect/181008073",
                                        "iucnStatus": "VU",
                                        "className": "Säugetiere",
                                        "order": "Rüsseltiere",
                                        "species": "Afrikanischer Elefant",
                                        "family": "Elefanten",
                                        "media": {
                                            "headerImage": {
                                                "data": {
                                                    "id": "16",
                                                    "attributes": {
                                                        "name": "African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg",
                                                        "x": null,
                                                        "y": null,
                                                        "formats": {
                                                            "thumbnail": {
                                                                "name": "thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg",
                                                                "hash": "thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 234,
                                                                "height": 156,
                                                                "size": 8.27,
                                                                "url": "/uploads/thumbnail_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg"
                                                            },
                                                            "large": {
                                                                "name": "large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg",
                                                                "hash": "large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 1000,
                                                                "height": 667,
                                                                "size": 110.04,
                                                                "url": "/uploads/large_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg"
                                                            },
                                                            "medium": {
                                                                "name": "medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg",
                                                                "hash": "medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 750,
                                                                "height": 500,
                                                                "size": 65.62,
                                                                "url": "/uploads/medium_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg"
                                                            },
                                                            "small": {
                                                                "name": "small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef.jpeg",
                                                                "hash": "small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 500,
                                                                "height": 333,
                                                                "size": 31.11,
                                                                "url": "/uploads/small_African_Elephant_Loxodonta_africana_male_16723147361_285ede05ef_4caad212c6.jpeg"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                            ]
                        }
                }),
            )
        }

        if('an-existing-slug-no-header-image' === request.variables.slug){
            return response(
                context.data({
                    animals: {
                        data: [
                            {
                                "id": "3",
                                "attributes": {
                                    "title": "Anden-Felsenhahn",
                                    "slug": "anden-felsenhahn",
                                    "body": "\nI am content.\n",
                                    "wikidata": "Q490393",
                                    "wikipediaLink": "https://de.wikipedia.org/wiki/Andenfelsenhahn",
                                    "scientificName": "Rupicola peruvianus",
                                    "iucnID": "22700974",
                                    "iucnLink": "https://apiv3.iucnredlist.org/api/v3/taxonredirect/22700974",
                                    "iucnStatus": "LC",
                                    "className": "Vögel",
                                    "order": "Sperlingsvögel",
                                    "species": "Anden-Felsenhahn",
                                    "family": "Schmuckvögel",
                                    "media": null
                                }
                            }
                        ],
                    },
                }),
            )
        }

    }),
    */

    graphql.query('AnimalsBySlug', AnimalsBySlug),

    graphql.query('QrCodeById', QrCodeById),

    graphql.query('QrCodes', QrCodes),

    graphql.query('IndividualAnimalsBySlug', IndividualAnimalsBySlug),

    graphql.query('IndividualAnimals', IndividualAnimals),

    graphql.query('Nodes', Nodes),

    graphql.query('Edges', Edges),

    graphql.query('Markers', Markers),

]
