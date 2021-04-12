export interface Taxonomy {
    class: string;
    order: string;
    family: string;
    species: string;
};

export interface i18nAnimal{
    en: string;
    de: string;
    nl: string;
}

export interface Animal {
    slug: string;
    title:string;
    taxonomy: Taxonomy
    wikidata:string;
    wikipediaLink: string;
    images:  string[];
    scientificName: string;
    i18nNames: i18nAnimal,
    iucnID: string;
    iucnLink: string;
    iucnStatus: string;
    content: string;
    facility?: string | null;
    published: boolean;
}
