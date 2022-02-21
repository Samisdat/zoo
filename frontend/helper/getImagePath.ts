export const getImagePath = (imagePath) =>{

    const domain = '192.168.178.21';
    //const domain = '127.0.0.1';
    const port = '1337';

    return `//${domain}:${port}${imagePath}`;

}