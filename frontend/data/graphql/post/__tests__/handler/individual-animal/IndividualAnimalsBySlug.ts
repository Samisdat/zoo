// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../../data/individual-animals.json');

export const IndividualAnimalsBySlug = (request, response, context) => {

    if('sabie' === request.variables.slug){

        return response(
            context.data(
                data.IndividualAnimalsBySlug.sabie.data
            ),
        )

    }

}