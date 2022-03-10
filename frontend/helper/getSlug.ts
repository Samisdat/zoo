import slugify from 'slugify';

const slugifyOptions = {
    locale: 'de',
    lower:true
};

export const getSlug = (toBeSlugged:string) => {

    return slugify(
        toBeSlugged,
        slugifyOptions
    );

}

