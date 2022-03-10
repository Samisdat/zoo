import {protocol, strapi} from '../constants';

export const getImagePath = (imagePath) =>{

    return `${protocol}${strapi}${imagePath}`;

}