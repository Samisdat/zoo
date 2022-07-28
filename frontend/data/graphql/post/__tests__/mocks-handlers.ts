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
                            "posts": {
                                "data": [
                                    {
                                        "id": "78",
                                        "attributes": {
                                            "title": "Junge Schneeleoparden auf Entdeckungstour",
                                            "slug": "junge-schneeleoparden-auf-entdeckungstour",
                                            "date": "2022-07-25",
                                            "content": [
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "**Die jungen Schneeleoparden gedeihen prächtig und werden immer unternehmungslustiger. Wir berichten, welche Namen sie erhalten haben, wie sie Mutter Saida auf Trab halten und wie sie sich mit Vater Shahrukh verstehen.**\n\nUnsere Anfang Mai geborenen Schneeleoparden-Jungtiere entwickeln sich gut. Die erstmalige Mutter Saida kümmert sich prima um ihren Nachwuchs. Inzwischen zeigt sich die Familie auch immer öfters in der grossen Anlage, so dass auch die Besucher*innen einen Blick auf sie erhaschen können."
                                                },
                                                {
                                                    "__typename": "ComponentContentYoutube",
                                                    "youtubeUrl": "https://www.youtube.com/watch?v=oE3uDdciBoA&t=2s",
                                                    "caption": "Video: Zoo Zürich, Nicole Schnyder"
                                                },
                                                {
                                                    "__typename": "ComponentContentHeadline",
                                                    "headline": "Namen via Abstimmung",
                                                    "level": "h2"
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Seit der [ersten Tierarztkontrolle](https://www.zoo.ch/de/zoonews/erster-tierarztcheck-der-jungen-schneeleoparden) am 20. Juni wissen wir, dass es sich bei den beiden Jungtieren um ein Weibchen und ein Männchen handelt. Ihre Namen haben wir im Rahmen einer [Online-Abstimmung](https://www.zoo.ch/de/zoonews/mitbestimmen-namen-fuer-die-schneeleoparden) ermittelt. Die meisten Stimmen erhielten Wajra für das Weibchen und Warjun für das Männchen.\n\nAlle Jungtiere des Zoo Zürich erhalten heuer einen Namen, der mit dem Buchstaben W beginnt."
                                                },
                                                {
                                                    "__typename": "ComponentContentImage",
                                                    "align": "fullsize",
                                                    "image": {
                                                        "data": {
                                                            "id": "103",
                                                            "attributes": {
                                                                "name": "1772-24211-0.jpeg",
                                                                "caption": "Bruder und Schwester: Warjun (l.) und Wajra",
                                                                "alternativeText": "Bruder und Schwester: Warjun (l.) und Wajra",
                                                                "copyright": "Zoo Zürich, Albert Schmidmeister",
                                                                "x": null,
                                                                "y": null,
                                                                "formats": {
                                                                    "thumbnail": {
                                                                        "name": "thumbnail_1772-24211-0.jpeg",
                                                                        "hash": "thumbnail_1772_24211_0_f1bcd66851",
                                                                        "ext": ".jpeg",
                                                                        "mime": "image/jpeg",
                                                                        "path": null,
                                                                        "width": 221,
                                                                        "height": 156,
                                                                        "size": 13.72,
                                                                        "url": "/uploads/thumbnail_1772_24211_0_f1bcd66851.jpeg"
                                                                    },
                                                                    "large": {
                                                                        "name": "large_1772-24211-0.jpeg",
                                                                        "hash": "large_1772_24211_0_f1bcd66851",
                                                                        "ext": ".jpeg",
                                                                        "mime": "image/jpeg",
                                                                        "path": null,
                                                                        "width": 1000,
                                                                        "height": 707,
                                                                        "size": 173.93,
                                                                        "url": "/uploads/large_1772_24211_0_f1bcd66851.jpeg"
                                                                    },
                                                                    "medium": {
                                                                        "name": "medium_1772-24211-0.jpeg",
                                                                        "hash": "medium_1772_24211_0_f1bcd66851",
                                                                        "ext": ".jpeg",
                                                                        "mime": "image/jpeg",
                                                                        "path": null,
                                                                        "width": 750,
                                                                        "height": 530,
                                                                        "size": 109.66,
                                                                        "url": "/uploads/medium_1772_24211_0_f1bcd66851.jpeg"
                                                                    },
                                                                    "small": {
                                                                        "name": "small_1772-24211-0.jpeg",
                                                                        "hash": "small_1772_24211_0_f1bcd66851",
                                                                        "ext": ".jpeg",
                                                                        "mime": "image/jpeg",
                                                                        "path": null,
                                                                        "width": 500,
                                                                        "height": 353,
                                                                        "size": 56.01,
                                                                        "url": "/uploads/small_1772_24211_0_f1bcd66851.jpeg"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    "__typename": "ComponentContentHeadline",
                                                    "headline": "Je länger je aktiver",
                                                    "level": "h2"
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Wajra und Warjun werden immer aktiver. Zunächst erkundeten sie ihre Wurfbox. Als sie erlickten, wie sie [aus der Wurfbox klettern](https://www.zoo.ch/de/zoonews/junge-schneeleoparden-auf-klettertour) können, erforschten sie die nähere Umgebung. Mutter Saida trug die Jungen zunächst aber immer wieder in die Wurfbox zurück."
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Mittlerweile kann oder will Saida die Kleinen nicht mehr davon abhalten, auch grössere Ausflüge zu unternehmen. Dadurch sind die jungen Schneeleoparden nun auch häufiger auf der grossen Aussenanlage sichtbar.\n\nEtwas Glück und Geduld braucht es für die Besucher*innen aber nach wie vor, um einen Blick auf Wajra und Warjun zu erhaschen."
                                                },
                                                {
                                                    "__typename": "ComponentContentHeadline",
                                                    "headline": "Allerziehende Schneeleoparden-Mütter",
                                                    "level": "h2"
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Schneeleoparden-Weibchen haben im Mittel zwei Jungtiere pro Wurf. Nach zwei bis vier Monaten folgen sie der Mutter vermehrt. Allerdings sind sie der Mutter in diesem Alter bei der Jagd eher ein Hindernis als eine Hilfe."
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Ganz unabhängig von der Mutter sind die Jungtiere nach etwa achtzehn Monaten. Mit zwei bis drei Jahren werden sie geschlechtsreif und suchen sich ein eigenes Revier.\n\nIn der Wildnis sind sowohl die Mutter als auch der Vater Einzelgänger. Die Schneeleoparden-Männchen interagieren nicht mit den Jungtieren. Im Zoo Zürich lebt Vater Shahrukh aber weiterhin zusammen mit Saida, Wajra und Warjun und sie verstehen sich sehr gut miteinander."
                                                },
                                                {
                                                    "__typename": "ComponentContentHeadline",
                                                    "headline": "Bedrohte Tierart ",
                                                    "level": "h2"
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Schneeleoparden sind in ihrem natürlichen Lebensraum in Zentralasien bedroht. Die Welt-Naturschutzunion IUCN listet die Art als «gefährdet». Sie schätzt, dass es derzeit noch etwa 3000 erwachsene Schneeleoparden in der Natur gibt.\n\nDer Schneeleopard ist vor allem durch den Rückgang seiner Beutetiere bedroht. Hinzu kommt, dass ihn Schafshirten bejagen, weil sie so ihre Herden schützen möchten. Weiter wird der Schneeleopard auch wegen seines Fells getötet. Und die Traditionelle Chinesische Medizin nutzt die Knochen des Tiers."
                                                },
                                                {
                                                    "__typename": "ComponentContentHeadline",
                                                    "headline": "Seit Zoogründung in Zürich",
                                                    "level": "h2"
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Der Zoo Zürich hält Schneeleoparden bereits seit seiner Eröffnung 1929. Seither sind im Zoo Zürich 59 Jungtiere zur Welt gekommen."
                                                },
                                                {
                                                    "__typename": "ComponentContentText",
                                                    "text": "Der Zoo hält und züchtet die Schneeleoparden im Rahmen des [Europäischen Erhaltungszuchtprogrammes EEP](https://www.eaza.net/conservation/programmes/)."
                                                },
                                                {
                                                    "__typename": "ComponentContentImages",
                                                    "images": {
                                                        "data": [
                                                            {
                                                                "id": "104",
                                                                "attributes": {
                                                                    "name": "Warjun",
                                                                    "caption": "Warjun",
                                                                    "alternativeText": "Warjun",
                                                                    "copyright": " Zoo Zürich, Monika Bader",
                                                                    "x": null,
                                                                    "y": null,
                                                                    "formats": {
                                                                        "thumbnail": {
                                                                            "name": "thumbnail_2244-24223.jpeg",
                                                                            "hash": "thumbnail_2244_24223_95d8e00d39",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 245,
                                                                            "height": 138,
                                                                            "size": 10.66,
                                                                            "url": "/uploads/thumbnail_2244_24223_95d8e00d39.jpeg"
                                                                        },
                                                                        "large": {
                                                                            "name": "large_2244-24223.jpeg",
                                                                            "hash": "large_2244_24223_95d8e00d39",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 1000,
                                                                            "height": 563,
                                                                            "size": 102.23,
                                                                            "url": "/uploads/large_2244_24223_95d8e00d39.jpeg"
                                                                        },
                                                                        "medium": {
                                                                            "name": "medium_2244-24223.jpeg",
                                                                            "hash": "medium_2244_24223_95d8e00d39",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 750,
                                                                            "height": 422,
                                                                            "size": 64.16,
                                                                            "url": "/uploads/medium_2244_24223_95d8e00d39.jpeg"
                                                                        },
                                                                        "small": {
                                                                            "name": "small_2244-24223.jpeg",
                                                                            "hash": "small_2244_24223_95d8e00d39",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 500,
                                                                            "height": 281,
                                                                            "size": 33.31,
                                                                            "url": "/uploads/small_2244_24223_95d8e00d39.jpeg"
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                "id": "105",
                                                                "attributes": {
                                                                    "name": "Wajra",
                                                                    "caption": "Wajra",
                                                                    "alternativeText": "Wajra",
                                                                    "copyright": "Zoo Zürich, Peter Bolliger",
                                                                    "x": null,
                                                                    "y": null,
                                                                    "formats": {
                                                                        "thumbnail": {
                                                                            "name": "thumbnail_Wajra",
                                                                            "hash": "thumbnail_1772_24211_0_f353adc00c",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 245,
                                                                            "height": 138,
                                                                            "size": 9.44,
                                                                            "url": "/uploads/thumbnail_1772_24211_0_f353adc00c.jpeg"
                                                                        },
                                                                        "large": {
                                                                            "name": "large_Wajra",
                                                                            "hash": "large_1772_24211_0_f353adc00c",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 1000,
                                                                            "height": 563,
                                                                            "size": 105.87,
                                                                            "url": "/uploads/large_1772_24211_0_f353adc00c.jpeg"
                                                                        },
                                                                        "medium": {
                                                                            "name": "medium_Wajra",
                                                                            "hash": "medium_1772_24211_0_f353adc00c",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 750,
                                                                            "height": 422,
                                                                            "size": 61.62,
                                                                            "url": "/uploads/medium_1772_24211_0_f353adc00c.jpeg"
                                                                        },
                                                                        "small": {
                                                                            "name": "small_Wajra",
                                                                            "hash": "small_1772_24211_0_f353adc00c",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 500,
                                                                            "height": 281,
                                                                            "size": 30.43,
                                                                            "url": "/uploads/small_1772_24211_0_f353adc00c.jpeg"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "__typename": "ComponentContentImageSlider",
                                                    "images": {
                                                        "data": [
                                                            {
                                                                "id": "114",
                                                                "attributes": {
                                                                    "name": "1772-24242.jpeg",
                                                                    "caption": "Warjun und Wajra",
                                                                    "alternativeText": "Warjun und Wajra",
                                                                    "copyright": null,
                                                                    "x": null,
                                                                    "y": null,
                                                                    "formats": {
                                                                        "thumbnail": {
                                                                            "name": "thumbnail_1772-24242.jpeg",
                                                                            "hash": "thumbnail_1772_24242_b4c3376f20",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 221,
                                                                            "height": 156,
                                                                            "size": 12.31,
                                                                            "url": "/uploads/thumbnail_1772_24242_b4c3376f20.jpeg"
                                                                        },
                                                                        "large": {
                                                                            "name": "large_1772-24242.jpeg",
                                                                            "hash": "large_1772_24242_b4c3376f20",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 1000,
                                                                            "height": 707,
                                                                            "size": 197.36,
                                                                            "url": "/uploads/large_1772_24242_b4c3376f20.jpeg"
                                                                        },
                                                                        "medium": {
                                                                            "name": "medium_1772-24242.jpeg",
                                                                            "hash": "medium_1772_24242_b4c3376f20",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 750,
                                                                            "height": 530,
                                                                            "size": 114.75,
                                                                            "url": "/uploads/medium_1772_24242_b4c3376f20.jpeg"
                                                                        },
                                                                        "small": {
                                                                            "name": "small_1772-24242.jpeg",
                                                                            "hash": "small_1772_24242_b4c3376f20",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 500,
                                                                            "height": 353,
                                                                            "size": 54.46,
                                                                            "url": "/uploads/small_1772_24242_b4c3376f20.jpeg"
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                "id": "113",
                                                                "attributes": {
                                                                    "name": "1772-24180.jpeg",
                                                                    "caption": "Grumpy Cat? Warjun",
                                                                    "alternativeText": "Grumpy Cat? Warjun",
                                                                    "copyright": null,
                                                                    "x": null,
                                                                    "y": null,
                                                                    "formats": {
                                                                        "thumbnail": {
                                                                            "name": "thumbnail_1772-24180.jpeg",
                                                                            "hash": "thumbnail_1772_24180_4be4b4f2fb",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 245,
                                                                            "height": 138,
                                                                            "size": 12.87,
                                                                            "url": "/uploads/thumbnail_1772_24180_4be4b4f2fb.jpeg"
                                                                        },
                                                                        "large": {
                                                                            "name": "large_1772-24180.jpeg",
                                                                            "hash": "large_1772_24180_4be4b4f2fb",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 1000,
                                                                            "height": 563,
                                                                            "size": 140,
                                                                            "url": "/uploads/large_1772_24180_4be4b4f2fb.jpeg"
                                                                        },
                                                                        "medium": {
                                                                            "name": "medium_1772-24180.jpeg",
                                                                            "hash": "medium_1772_24180_4be4b4f2fb",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 750,
                                                                            "height": 422,
                                                                            "size": 88.14,
                                                                            "url": "/uploads/medium_1772_24180_4be4b4f2fb.jpeg"
                                                                        },
                                                                        "small": {
                                                                            "name": "small_1772-24180.jpeg",
                                                                            "hash": "small_1772_24180_4be4b4f2fb",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 500,
                                                                            "height": 281,
                                                                            "size": 45.14,
                                                                            "url": "/uploads/small_1772_24180_4be4b4f2fb.jpeg"
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                "id": "112",
                                                                "attributes": {
                                                                    "name": "1772-24228.jpeg",
                                                                    "caption": "Gut getarnt im Fels",
                                                                    "alternativeText": "Gut getarnt im Fels",
                                                                    "copyright": null,
                                                                    "x": null,
                                                                    "y": null,
                                                                    "formats": {
                                                                        "thumbnail": {
                                                                            "name": "thumbnail_1772-24228.jpeg",
                                                                            "hash": "thumbnail_1772_24228_643386c830",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 245,
                                                                            "height": 138,
                                                                            "size": 8.9,
                                                                            "url": "/uploads/thumbnail_1772_24228_643386c830.jpeg"
                                                                        },
                                                                        "large": {
                                                                            "name": "large_1772-24228.jpeg",
                                                                            "hash": "large_1772_24228_643386c830",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 1000,
                                                                            "height": 563,
                                                                            "size": 114.32,
                                                                            "url": "/uploads/large_1772_24228_643386c830.jpeg"
                                                                        },
                                                                        "medium": {
                                                                            "name": "medium_1772-24228.jpeg",
                                                                            "hash": "medium_1772_24228_643386c830",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 750,
                                                                            "height": 422,
                                                                            "size": 66.39,
                                                                            "url": "/uploads/medium_1772_24228_643386c830.jpeg"
                                                                        },
                                                                        "small": {
                                                                            "name": "small_1772-24228.jpeg",
                                                                            "hash": "small_1772_24228_643386c830",
                                                                            "ext": ".jpeg",
                                                                            "mime": "image/jpeg",
                                                                            "path": null,
                                                                            "width": 500,
                                                                            "height": 281,
                                                                            "size": 31.5,
                                                                            "url": "/uploads/small_1772_24228_643386c830.jpeg"
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "__typename": "ComponentContentVideo",
                                                    "video": {
                                                        "data": {
                                                            "attributes": {
                                                                "alternativeText": "Hirscheber-Yala-Kedua.mp4",
                                                                "caption": "Hirscheber-Yala-Kedua.mp4",
                                                                "copyright": null,
                                                                "url": "/uploads/Hirscheber_Yala_Kedua_8d0a1a877c.mp4"
                                                            }
                                                        }
                                                    }
                                                }
                                            ],
                                            "headerImage": {
                                                "data": {
                                                    "id": "101",
                                                    "attributes": {
                                                        "name": "https://zoo-live.rokka.io/header_half_md_2x/1d3aa3faba2faf3fba1030fc08381c3648e2f488/2244-24230-3.jpg",
                                                        "x": null,
                                                        "y": null,
                                                        "copyright": null,
                                                        "formats": {
                                                            "thumbnail": {
                                                                "name": "thumbnail_https://zoo-live.rokka.io/header_half_md_2x/1d3aa3faba2faf3fba1030fc08381c3648e2f488/2244-24230-3.jpg",
                                                                "hash": "thumbnail_2244_24230_3_ec28ebff51",
                                                                "ext": ".jpg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 245,
                                                                "height": 88,
                                                                "size": 6.44,
                                                                "url": "/uploads/thumbnail_2244_24230_3_ec28ebff51.jpg"
                                                            },
                                                            "large": {
                                                                "name": "large_https://zoo-live.rokka.io/header_half_md_2x/1d3aa3faba2faf3fba1030fc08381c3648e2f488/2244-24230-3.jpg",
                                                                "hash": "large_2244_24230_3_ec28ebff51",
                                                                "ext": ".jpg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 1000,
                                                                "height": 360,
                                                                "size": 83.48,
                                                                "url": "/uploads/large_2244_24230_3_ec28ebff51.jpg"
                                                            },
                                                            "medium": {
                                                                "name": "medium_https://zoo-live.rokka.io/header_half_md_2x/1d3aa3faba2faf3fba1030fc08381c3648e2f488/2244-24230-3.jpg",
                                                                "hash": "medium_2244_24230_3_ec28ebff51",
                                                                "ext": ".jpg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 750,
                                                                "height": 270,
                                                                "size": 49.32,
                                                                "url": "/uploads/medium_2244_24230_3_ec28ebff51.jpg"
                                                            },
                                                            "small": {
                                                                "name": "small_https://zoo-live.rokka.io/header_half_md_2x/1d3aa3faba2faf3fba1030fc08381c3648e2f488/2244-24230-3.jpg",
                                                                "hash": "small_2244_24230_3_ec28ebff51",
                                                                "ext": ".jpg",
                                                                "mime": "image/jpeg",
                                                                "path": null,
                                                                "width": 500,
                                                                "height": 180,
                                                                "size": 23.5,
                                                                "url": "/uploads/small_2244_24230_3_ec28ebff51.jpg"
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
