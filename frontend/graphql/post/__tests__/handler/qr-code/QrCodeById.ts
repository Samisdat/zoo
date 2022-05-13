const data = require('../../data/qr-code.json');

export const QrCodeById = (request, response, context) => {

    if(1 === request.variables.id){

        return response(
            context.data(
                data.QrCodeById['1'].data
            ),
        )

    }

    if(2 === request.variables.id){

        return response(
            context.data(
                data.QrCodeById['2'].data
            ),
        )

    }

}