export const xmlTemplate = (body:string) => {

    return `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 2550 1994" version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
    xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
    <MetaInfo xmlns="http://www.prognoz.ru">
        <Geo>
            <GeoItem X="0" Y="0" Latitude="51.24177020918754" Longitude="7.105611562728882"/>
            <GeoItem X="2550" Y="1994" Latitude="51.236776961813064" Longitude="7.115809321403503"/>
        </Geo>
    </MetaInfo>
    ${body}
</svg>`;
}

