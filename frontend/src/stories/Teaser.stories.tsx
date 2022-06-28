import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Teaser} from "../../components/Map/Teaser/Teaser";
import {Photo} from "../../data/graphql/photo/photo";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Teaser',
  component: Teaser,
} as ComponentMeta<typeof Teaser>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />;

export const MultipleItems = Template.bind({});

MultipleItems.decorators = [
    (Story) => (
        <React.Fragment>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <Story />
        </React.Fragment>
    ),
];

const bonoboPhoto = Photo.hydrate({
    "id": 10,
    "title": "Apeldoorn_Apenheul_zoo_Bonobo_3df1ad379c.jpeg",
    "copyright": null,
    "thumbnail": {
        "width": 157,
        "height": 156,
        "src": "/uploads/thumbnail_Apeldoorn_Apenheul_zoo_Bonobo_3df1ad379c_a9a00981c1.jpeg"
    },
    "small": {
        "width": 500,
        "height": 496,
        "src": "/uploads/small_Apeldoorn_Apenheul_zoo_Bonobo_3df1ad379c_a9a00981c1.jpeg"
    },
    "medium": {
        "width": 750,
        "height": 744,
        "src": "/uploads/medium_Apeldoorn_Apenheul_zoo_Bonobo_3df1ad379c_a9a00981c1.jpeg"
    },
    "large": {
        "width": 1000,
        "height": 991,
        "src": "/uploads/large_Apeldoorn_Apenheul_zoo_Bonobo_3df1ad379c_a9a00981c1.jpeg"
    },
    "focalPoint": {
        "x": 50,
        "y": 50
    }
});
const orangUtanPhoto = Photo.hydrate({
    "id": 56,
    "title": "Orang_Utan_Semenggok_Forest_Reserve_Sarawak_Borneo_Malaysia_aedb786d39.jpeg",
    "copyright": null,
    "thumbnail": {
        "width": 108,
        "height": 156,
        "src": "/uploads/thumbnail_Orang_Utan_Semenggok_Forest_Reserve_Sarawak_Borneo_Malaysia_aedb786d39_9c689a8df8.jpeg"
    },
    "small": {
        "width": 346,
        "height": 500,
        "src": "/uploads/small_Orang_Utan_Semenggok_Forest_Reserve_Sarawak_Borneo_Malaysia_aedb786d39_9c689a8df8.jpeg"
    },
    "medium": {
        "width": 519,
        "height": 750,
        "src": "/uploads/medium_Orang_Utan_Semenggok_Forest_Reserve_Sarawak_Borneo_Malaysia_aedb786d39_9c689a8df8.jpeg"
    },
    "large": {
        "width": 692,
        "height": 1000,
        "src": "/uploads/large_Orang_Utan_Semenggok_Forest_Reserve_Sarawak_Borneo_Malaysia_aedb786d39_9c689a8df8.jpeg"
    },
    "focalPoint": {
        "x": 50,
        "y": 50
    }
});
const gorillaPhoto = Photo.hydrate({
    "id": 39,
    "title": "Gorille_ffd793ad8c.jpeg",
    "copyright": null,
    "thumbnail": {
        "width": 156,
        "height": 156,
        "src": "/uploads/thumbnail_Gorille_ffd793ad8c_3974e49eb4.jpeg"
    },
    "small": {
        "width": 500,
        "height": 500,
        "src": "/uploads/small_Gorille_ffd793ad8c_3974e49eb4.jpeg"
    },
    "medium": {
        "width": 750,
        "height": 750,
        "src": "/uploads/medium_Gorille_ffd793ad8c_3974e49eb4.jpeg"
    },
    "large": {
        "width": 1000,
        "height": 1000,
        "src": "/uploads/large_Gorille_ffd793ad8c_3974e49eb4.jpeg"
    },
    "focalPoint": {
        "x": 50,
        "y": 50
    }
});

MultipleItems.args = {
    handleRoute:()=>{

    },
    handleClose:()=>{

    },
    items:[
        {
            "slug": "animal-bonobo",
            "title": "Bonobo",
            "photo": bonoboPhoto,
            "href": "/tiere/bonobo"
        },
        {
            "slug": "animal-orang-utan",
            "title": "Orang Utan",
            "photo": orangUtanPhoto,
            "href": "/tiere/orang-utan"
        },
        {
            "slug": "animal-westlicher-gorilla",
            "title": "Westlicher Gorilla",
            "photo": gorillaPhoto,
            "href": "/tiere/westlicher-gorilla"
        }
    ]

};
