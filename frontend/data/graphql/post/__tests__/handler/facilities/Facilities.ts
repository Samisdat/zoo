// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../../data/facilities.json');

export const Facilities = (request, response, context) => {

    const facilities =
        data.Facilities.data;

    return response(
        context.data(facilities)
    );
};

export const FacilitiesBySlug = (request, response, context) => {

    const facilities = data.Facilities.data;

    facilities.facilities.data = facilities.facilities.data.filter((facility)=>{

        return (facility.attributes.slug === request.variables.slug)

    });

    return response(
        context.data(facilities)
    );
};

