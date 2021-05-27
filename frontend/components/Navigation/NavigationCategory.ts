export type NavigationIconType = 'Map' | 'Pets' | 'Store' | 'Book' | 'Code' | 'MenuBook';

export interface NavigationItem{
    key: string;
    href: string;
    icon: NavigationIconType;
    text: string;
}

export interface NavigationCategory {
    key: string;
    text: string;
    items: NavigationItem[]
}

export const navigationCategories:NavigationCategory[] = [
    {
        key: 'main',
        text: 'Hauptmenü',
        items:[
            {
                key: 'map',
                href: '/',
                icon: 'Map',
                text: 'Karte',
            },
            {
                key: 'animals',
                href: '/tiere',
                icon: 'Pets',
                text: 'Tiere',
            },
            {
                key: 'enclsures',
                href: '/anlagen',
                icon: 'Store',
                text: 'Anlagen',
            },
            {
                key: 'blog',
                href: '/blog',
                icon: 'Book',
                text: 'Neuigkeiten',
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
            },
            {
                key: 'about',
                href: '/dev/teaser',
                icon: 'Code',
                text: 'Teaser',
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
            },
            {
                key: 'about',
                href: '/ueber',
                icon: 'Code',
                text: 'Über',
            },
            {
                key: 'docs',
                href: '/documentation',
                icon: 'MenuBook',
                text: 'Dokumentation',
            },
        ]
    }
];