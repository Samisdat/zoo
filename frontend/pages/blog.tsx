import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Moment from 'react-moment';

import {ListItemLink} from './anlagen';
import {blogUrlPart} from '../constants';
import {getPosts} from 'strapi-api/query/posts';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {Post} from 'strapi-api/entity/post/post';
import {BreadcrumbLink} from '../components/Navigation/Breadcrumb';
import Page from '../components/Page/Page';

export default function Blog(props) {

    Warehouse.get().hydrate(props.warehouse);

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/blog',
            title: 'Blog',
            icon: 'blog',
        }
    ];

    const posts = Warehouse.get().getPosts()
    .sort((a,b) =>{

        if (a.date < b.date) {
            return 1;
        }

        if (a.date > b.date) {
            return -1;
        }
        // a muss gleich b sein
        return 0;
    })


    return (
        <Page
            headerImage={undefined}
            breadcrumb={breadcrumbLinks}
        >
            <List >
                {
                    posts.map( (post:Post) => {
                        const href =  `/${blogUrlPart}/${post.slug}`
                        return (
                            <ListItem key={post.slug}>
                                <ListItemLink href={href}>
                                    {post.title} - <Moment format="DD.MM.YYYY" date={post.date} /><br/>
                                </ListItemLink>
                            </ListItem>
                        );
                    })
                }
            </List>
        </Page>
    );
}



export async function getStaticProps({ params, preview = false, previewData }) {

    await getPosts();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
        },
    }

}