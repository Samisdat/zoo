import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";

export const navigationCategories:NavigationListGroupInterface[] = [
    {
        key: 'main',
        text: 'Hauptmenü',
        items:[
            {
                key: 'map',
                href: '/',
                icon: 'map',
                text: 'Karte',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'animals',
                href: '/tiere',
                icon: 'paw',
                text: 'Tiere',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'enclsures',
                href: '/anlagen',
                icon: 'home',
                text: 'Anlagen',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'blog',
                href: '/blog',
                icon: 'newspaper',
                text: 'Neuigkeiten',
                secondary: 'Lorem Ipsum',
            },
        ]
    },
    {
        key: 'dev',
        text: 'Dev',
        items:[
            {
                key: 'leaflet',
                href: '/dev/leaflet',
                icon: 'map',
                text: 'Leaflet Map',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'about',
                href: '/dev/teaser',
                icon: 'code',
                text: 'Teaser',
                secondary: 'Lorem Ipsum',
            },
        ]
    },
    {
        key: 'about',
        text: 'Diese Seite',
        items:[
            {
                key: 'imprint',
                href: '/impressum',
                icon: 'newspaper',
                text: 'Info',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'about',
                href: '/ueber',
                icon: 'code',
                text: 'Über',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'docs',
                href: '/documentation',
                icon: 'book',
                text: 'Dokumentation',
                secondary: 'Lorem Ipsum',
            },
        ]
    }
];