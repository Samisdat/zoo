import {key} from "../config";

export const getHeaders = () => {

    return {
        headers: {
            Authorization:
                `Bearer ${key}`,
        }
    };

}