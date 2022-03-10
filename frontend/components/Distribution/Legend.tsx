import React from 'react';

/**
 * Citation according to rules from iucn
 * <citation field information><year>. The IUCN Red List of Threatened Species. Version <Red List version>. https://www.iucnredlist.org. Downloaded on <insert appropriate date>.
 */

export const Legend = (props) => {

    //console.log(props.distributionGeoJson.features[0].properties);

    const citation = props.distributionGeoJson.features[0].properties.CITATION
    const year = props.distributionGeoJson.features[0].properties.YEAR
    const version = '2020-3';
    const downloadDate = '11.0.2021'

    return (
        <p>
            {citation} {year}. The IUCN Red List of Threatened Species. Version {version}. <br/>
            <a href='https://www.iucnredlist.org' target="_blank" rel="noreferrer">https://www.iucnredlist.org</a>. Downloaded on {downloadDate}
        </p>
    );

}