import {domain, port_4, protokoll} from "../config";

export const getUrl_4 = (path:string) => {

    const url = [
        protokoll,
        domain
    ];

    if(port_4){
        url.push(`:${port_4}`);
    }

    return url.join('') + path;

}
