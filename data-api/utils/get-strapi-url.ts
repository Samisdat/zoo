export function getStrapiUrl(path = "") {
    return `${
        process.env.STRAPI_DOMAIN || "http://localhost:1337"
    }${path}`;
}