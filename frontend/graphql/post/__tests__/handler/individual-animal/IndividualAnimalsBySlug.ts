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

export const QrCodes = (request, response, context) => {

    const qrCodes = [
        data.QrCodeById['1'].data.qrCode.data,
        data.QrCodeById['2'].data.qrCode.data
    ];

    return response(
        context.data({
            "qrCodes": {
                "data": qrCodes
            },
        }),
    )
}