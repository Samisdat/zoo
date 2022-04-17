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
                                    image: {
                                        data: {
                                            id: 6,
                                            attributes:{
                                                name: 'foobar',
                                                x:11,
                                                y:12,
                                                formats:{}
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

        if(request.variables.slug){
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
                                    image: {
                                        data: {
                                            id: 6,
                                            attributes:{
                                                name: 'foobar',
                                                x:11,
                                                y:12,
                                                formats:{}
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

    }),
]
