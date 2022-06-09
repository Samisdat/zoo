import { graphql } from 'msw'
import {QrCodeById, QrCodes} from "./handler/qr-code/QrCodeById";
import {IndividualAnimalsBySlug} from "./handler/individual-animal/IndividualAnimalsBySlug";
import {AnimalsBySlug} from "./handler/animal/AnimalsBySlug";
import {IndividualAnimals} from "./handler/individual-animal/IndividualAnimals";
import {Nodes} from "./handler/node/Nodes";
import {Edges} from "./handler/edge/Nodes";

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
                                headerImg: {
                                    "image": {
                                        "data": {
                                            "id": "25",
                                            "attributes": {
                                                "name": "drill_d1860953ec.jpeg",
                                                "x": 31,
                                                "y": 64,
                                                "formats": {
                                                    "thumbnail": {
                                                        "name": "thumbnail_drill_d1860953ec.jpeg",
                                                        "hash": "thumbnail_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 234,
                                                        "height": 156,
                                                        "size": 5.31,
                                                        "url": "/uploads/thumbnail_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "large": {
                                                        "name": "large_drill_d1860953ec.jpeg",
                                                        "hash": "large_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 1000,
                                                        "height": 668,
                                                        "size": 82.62,
                                                        "url": "/uploads/large_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "medium": {
                                                        "name": "medium_drill_d1860953ec.jpeg",
                                                        "hash": "medium_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 750,
                                                        "height": 501,
                                                        "size": 46.35,
                                                        "url": "/uploads/medium_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "small": {
                                                        "name": "small_drill_d1860953ec.jpeg",
                                                        "hash": "small_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 500,
                                                        "height": 334,
                                                        "size": 20.75,
                                                        "url": "/uploads/small_drill_d1860953ec_0c73b91c65.jpeg"
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
                        data: [{
                            id:5,
                            attributes:{
                                title: 'title',
                                slug: 'slug',
                                date: 'date',
                                body: 'body',
                                headerImg: {
                                    "image": {
                                        "data": {
                                            "id": "25",
                                            "attributes": {
                                                "name": "drill_d1860953ec.jpeg",
                                                "x": 31,
                                                "y": 64,
                                                "formats": {
                                                    "thumbnail": {
                                                        "name": "thumbnail_drill_d1860953ec.jpeg",
                                                        "hash": "thumbnail_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 234,
                                                        "height": 156,
                                                        "size": 5.31,
                                                        "url": "/uploads/thumbnail_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "large": {
                                                        "name": "large_drill_d1860953ec.jpeg",
                                                        "hash": "large_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 1000,
                                                        "height": 668,
                                                        "size": 82.62,
                                                        "url": "/uploads/large_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "medium": {
                                                        "name": "medium_drill_d1860953ec.jpeg",
                                                        "hash": "medium_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 750,
                                                        "height": 501,
                                                        "size": 46.35,
                                                        "url": "/uploads/medium_drill_d1860953ec_0c73b91c65.jpeg"
                                                    },
                                                    "small": {
                                                        "name": "small_drill_d1860953ec.jpeg",
                                                        "hash": "small_drill_d1860953ec_0c73b91c65",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 500,
                                                        "height": 334,
                                                        "size": 20.75,
                                                        "url": "/uploads/small_drill_d1860953ec_0c73b91c65.jpeg"
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
                                headerImg: null
                            }
                        }],
                    },
                }),
            )
        }

    }),

    graphql.query('Facilities', (request, response, context) => {

        return response(
            context.data({
                "facilities": {
                    "data": [
                        {
                            "id": "4",
                            "attributes": {
                                "title": "Brillenpinguine",
                                "slug": "brillenpinguine",
                                "body": "Some Content\n",
                                "type": "enclosure",
                                "headerImg": null
                            }
                        },
                        {
                            "id": "5",
                            "attributes": {
                                "title": "Eingang",
                                "slug": "eingang",
                                "body": "Some Content\n",
                                "type": "poi",
                                "headerImg": {
                                    "image": {
                                        "data": {
                                            "id": "79",
                                            "attributes": {
                                                "name": "Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                "x": null,
                                                "y": null,
                                                "formats": {
                                                    "thumbnail": {
                                                        "name": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 208,
                                                        "height": 156,
                                                        "size": 7.67,
                                                        "url": "/uploads/thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "large": {
                                                        "name": "large_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 1000,
                                                        "height": 750,
                                                        "size": 125.5,
                                                        "url": "/uploads/large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "medium": {
                                                        "name": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 750,
                                                        "height": 563,
                                                        "size": 74.54,
                                                        "url": "/uploads/medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "small": {
                                                        "name": "small_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 500,
                                                        "height": 375,
                                                        "size": 35.02,
                                                        "url": "/uploads/small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            "id": "10",
                            "attributes": {
                                "title": "JuniorZoo",
                                "slug": "juniorzoo",
                                "body": "Some Content\n",
                                "type": "enclosure",
                                "headerImg": null
                            }
                        },
                        {
                            "id": "11",
                            "attributes": {
                                "title": "Kangurus",
                                "slug": "kangurus",
                                "body": "Some Content\n",
                                "type": "enclosure",
                                "headerImg": null
                            }
                        }
                    ]
                },
            }),
        )
    }),
    graphql.query('FacilitiesBySlug', (request, response, context) => {

        if('an-existing-slug' === request.variables.slug){
            return response(
                context.data({
                    facilities: {
                            "data": [
                                {
                                    "id": "5",
                                    "attributes": {
                                        "title": "Eingang",
                                        "slug": "an-existing-slug",
                                        "body": "Some Content\n",
                                        "type": "poi",
                                        "headerImg": {
                                            "image": {
                                                "data": {
                                                    "id": "79",
                                                    "attributes": {
                                                        "name": "Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "x": null,
                                                        "y": null,
                                                        "formats": {
                                                            "thumbnail": {
                                                                "name": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                                "hash": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 208,
                                                                "height": 156,
                                                                "size": 7.67,
                                                                "url": "/uploads/thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                            },
                                                            "large": {
                                                                "name": "large_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                                "hash": "large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 1000,
                                                                "height": 750,
                                                                "size": 125.5,
                                                                "url": "/uploads/large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                            },
                                                            "medium": {
                                                                "name": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                                "hash": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 750,
                                                                "height": 563,
                                                                "size": 74.54,
                                                                "url": "/uploads/medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                            },
                                                            "small": {
                                                                "name": "small_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                                "hash": "small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                                "ext": ".jpeg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 500,
                                                                "height": 375,
                                                                "size": 35.02,
                                                                "url": "/uploads/small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                }),
            )
        }

        if('an-existing-slug-no-header-image' === request.variables.slug){
            return response(
                context.data({
                    facilities: {
                        data: [{
                            id:5,
                            attributes:{
                                title: "Eingang",
                                slug: "an-existing-slug",
                                body: "Some Content\n",
                                type: "poi",
                                headerImg: null
                            }
                        }],
                    },
                }),
            )
        }

    }),

    graphql.query('Animals', (request, response, context) => {

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
                                "headerImg": {
                                    "image": {
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
                        {
                            "id": "2",
                            "attributes": {
                                "title": "Afrikanischer Esel",
                                "slug": "afrikanischer-esel",
                                "body": "\nI am content.\n",
                                "wikidata": "Q208140",
                                "wikipediaLink": "https://de.wikipedia.org/wiki/Afrikanischer_Esel",
                                "scientificName": "Equus africanus",
                                "iucnID": "7949",
                                "iucnLink": "https://apiv3.iucnredlist.org/api/v3/taxonredirect/7949",
                                "iucnStatus": "CR",
                                "className": "Säugetiere",
                                "order": "Unpaarhufer",
                                "species": "Afrikanischer Esel",
                                "family": "Pferde",
                                "headerImg": {
                                    "image": {
                                        "data": {
                                            "id": "79",
                                            "attributes": {
                                                "name": "Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                "x": null,
                                                "y": null,
                                                "formats": {
                                                    "thumbnail": {
                                                        "name": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 208,
                                                        "height": 156,
                                                        "size": 7.67,
                                                        "url": "/uploads/thumbnail_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "large": {
                                                        "name": "large_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 1000,
                                                        "height": 750,
                                                        "size": 125.5,
                                                        "url": "/uploads/large_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "medium": {
                                                        "name": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 750,
                                                        "height": 563,
                                                        "size": 74.54,
                                                        "url": "/uploads/medium_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    },
                                                    "small": {
                                                        "name": "small_Zoo_Wuppertal_Eingang_01_dc640ef313.jpeg",
                                                        "hash": "small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be",
                                                        "ext": ".jpeg",
                                                        "mime": "image/jpeg",
                                                        "path": null,
                                                        "width": 500,
                                                        "height": 375,
                                                        "size": 35.02,
                                                        "url": "/uploads/small_Zoo_Wuppertal_Eingang_01_dc640ef313_630eb3c0be.jpeg"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
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
                                "headerImg": null
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
                                        "headerImg": {
                                            "image": {
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
                                    "headerImg": null
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

]
