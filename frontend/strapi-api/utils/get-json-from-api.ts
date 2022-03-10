import fetch from 'node-fetch';

export const getJsonFromApi = async <Type>(requestUrl:string):Promise<Type> => {

    const response = await fetch(requestUrl);
    const json = await response.json();

    return json;

}
