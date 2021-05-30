import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";

export const navigationCategories:NavigationListGroupInterface[] = [
    {
        key: 'main',
        text: 'Hauptmenü',
        items:[
            {
                key: 'map',
                href: '/',
                icon: 'Map',
                text: 'Karte',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'animals',
                href: '/tiere',
                icon: 'Pets',
                text: 'Tiere',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'enclsures',
                href: '/anlagen',
                icon: 'Store',
                text: 'Anlagen',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'blog',
                href: '/blog',
                icon: 'Book',
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
                icon: 'Map',
                text: 'Leaflet Map',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'about',
                href: '/dev/teaser',
                icon: 'Code',
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
                icon: 'Book',
                text: 'Info',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'about',
                href: '/ueber',
                icon: 'Code',
                text: 'Über',
                secondary: 'Lorem Ipsum',
            },
            {
                key: 'docs',
                href: '/documentation',
                icon: 'MenuBook',
                text: 'Dokumentation',
                secondary: 'Lorem Ipsum',
            },
        ]
    }
];