import { graphql } from 'msw'

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
]
