import {domain, port_3, protokoll} from "../config";

export const getUrl_3 = (path:string) => {

    const url = [
        protokoll,
        domain
    ];

    if(port_3){
        url.push(`:${port_3}`);
    }

    return url.join('') + path;

}
