// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../../data/animal.json');

export const AnimalsBySlug = (request, response, context) => {

    if('afrikanischer-elefant' === request.variables.slug){

        return response(
            context.data(
                data.AnimalsBySlug['afrikanischer-elefant'].data
            )
        );

    }

    if('an-existing-slug-no-header-image' === request.variables.slug){

        const dataWithoutHeaderImg = data.AnimalsBySlug['afrikanischer-elefant'].data;

        dataWithoutHeaderImg.animals.data[0].attributes.headerImg = null;

        return response(
            context.data(
                dataWithoutHeaderImg
            )
        );

    }

}