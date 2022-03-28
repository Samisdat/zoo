import fetch from 'node-fetch';

export const getJsonFromApi = async <Type>(requestUrl:string):Promise<Type> => {

    const response = await fetch(
        requestUrl,
    {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
            }
        }
    );
    const json = await response.json();

    return json.data;

}
