const data = require('../../data/individual-animals.json');

export const IndividualAnimals = (request, response, context) => {

    const individualAnimals = [
        data.IndividualAnimalsBySlug.sabie.data.individualAnimals.data[0],
        data.IndividualAnimalsBySlug.tuffi.data.individualAnimals.data[0]
    ];

    return response(
        context.data({
            "individualAnimals":{
                "data": individualAnimals
            }
        })
    );
}