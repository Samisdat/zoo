export function getStrapi3Url(path = '') {
    return `${
        process.env.STRAPI_DOMAIN || 'http://localhost:1337'
    }${path}`;
}

export function getStrapiUrl(path = '') {
    return `${
        process.env.STRAPI_DOMAIN || 'http://localhost:1338'
    }${path}`;
}