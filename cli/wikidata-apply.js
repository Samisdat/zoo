const fs = require("fs");
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto')

const dataDir = path.resolve(process.env.PWD, 'pages/api/data/markdown/animals');
const wikidataDir = path.resolve(process.env.PWD, 'pages/api/data/wikidata/json');

const animals = fs.readdirSync(dataDir);

const frontmatter = require('@github-docs/frontmatter')

const wikidataSearch = async function (id) {
    try{
        const { stdout, stderr } = await exec('wd data ' + id);

        console.log(stdout)
        if(stdout){

            let json = null;

            try{
                json = JSON.parse(stdout)
            }
            catch (e){
            }

            return json ;
        }

        return null;

    }
    catch (e){
        console.log(e)
    }

}

const getImage = (imageProperty) => {

    const fileName = imageProperty.mainsnak.datavalue.value.replace(/ /g, '_');

    let hash = crypto.createHash('md5').update(fileName).digest("hex")

    const a = hash[0];
    const b = hash[1];

    const path = `https://upload.wikimedia.org/wikipedia/commons/${a}/${a}${b}/${fileName}`

    return path;

}

const getImages = (imagesProperty) => {

    const images = imagesProperty.map((imageProperty)=>{
        return getImage(imageProperty);
    })

    return images;

}

const getScientificName = (nameProperty) => {

    if(0 === nameProperty.length){
        return;
    }

    return nameProperty[0].mainsnak.datavalue.value;
}

const getI18nName = (i18nProberty) => {

    const lang = i18nProberty.mainsnak.datavalue.value.language;
    const name = i18nProberty.mainsnak.datavalue.value.text;

    return{
        lang,
        name
    };
}
const getI18nNames = (i18nNamesProberty, labels) => {

    let en, de, nl = undefined;

    if(undefined !== i18nNamesProberty){
        const names = i18nNamesProberty.map(getI18nName);

        en = names.find((name)=>{
            return ('en' === name.lang);
        });

        if(undefined !== en){
            en = en.name;
        }

        de = names.find((name)=>{
            return ('de' === name.lang);
        });

        if(undefined !== de){
            de = de.name;
        }

        nl = names.find((name)=>{
            return ('nl' === name.lang);
        });
        if(undefined !== nl){
            nl = nl.name;
        }

    }

    if(undefined === en && undefined !== labels.en){
        en = labels.en.value;
    }

    if(undefined === de && undefined !== labels.de){
        de = labels.de.value;
    }

    if(undefined === nl && undefined !== labels.nl){
        nl = labels.nl.value;
    }

    const i18nNames = {
        en,
        de,
        nl
    };

    return i18nNames;
}

const getIucnID = (i18nNamesProberty) => {

    if(1 !== i18nNamesProberty.length){
        return undefined;
    }

    return i18nNamesProberty[0].mainsnak.datavalue.value;

}

const getIucnStatus = (iucnStatusProberty) => {

    if(1 !== iucnStatusProberty.length){
        return undefined;
    }

    return iucnStatusProberty[0].mainsnak.datavalue.value.id;

}


const extractWikiData = (wikidata) => {

    let wikipediaLink = undefined;
    if(
        undefined !== wikidata.sitelinks &&
        undefined !== wikidata.sitelinks.dewiki &&
        undefined !== wikidata.sitelinks.dewiki.title
    ){
        wikipediaLink =  'https://de.wikipedia.org/wiki/' + wikidata.sitelinks.dewiki.title.replace(' ', '_');
    }

    let images = [];

    if(undefined !== wikidata.claims.P18){
        images = getImages(wikidata.claims.P18);
    }

    let scientificName = undefined;

    if(undefined !== wikidata.claims.P225){
        scientificName = getScientificName(wikidata.claims.P225)
    }

    let i18nNames = getI18nNames(wikidata.claims.P1843, wikidata.labels)

    let iucnID = undefined;
    let iucnLink = undefined;

    if(undefined !== wikidata.claims.P627){
        iucnID = getIucnID(wikidata.claims.P627)

        if(undefined !== iucnID){
            iucnLink = `https://apiv3.iucnredlist.org/api/v3/taxonredirect/${iucnID}`;
        }
    }

    let iucnStatus = undefined;

    if(undefined !== wikidata.claims.P141){
        iucnStatus = getIucnStatus(wikidata.claims.P141)
    }

    //https://upload.wikimedia.org/wikipedia/commons/5/54/Testudo_kleinmanni.jpg
    return{
        wikipediaLink: wikipediaLink,
        images:images,
        scientificName:scientificName,
        i18nNames: i18nNames,
        iucnID,
        iucnLink,
        iucnStatus
    }

};

const loopData = async () => {

    for(const animal of animals){

        const animalFilePath = path.resolve(dataDir, animal);
        const animalFile = fs.readFileSync(animalFilePath, {encoding:'utf-8'});

        if (false === fs.existsSync(animalFilePath)) {
            console.log('animalfile does not exist', animalFile);

            continue;
        }

        const animalMarkdown = frontmatter(animalFile);

        if(null === animalMarkdown.data.wikidata){
            continue;
        }

        const wikidataId = animalMarkdown.data.wikidata;

        console.log('wikidataId', wikidataId);

        const wikidataFilePath = path.resolve(wikidataDir, wikidataId + '.json');

        if (true !== fs.existsSync(wikidataFilePath)) {
            console.log('wikidata does not exist', wikidataFilePath)

            continue;
        }

        const wikidataFile = fs.readFileSync(wikidataFilePath, {encoding:'utf-8'});

        const wikidataJson = JSON.parse(wikidataFile);

        const wikiData = extractWikiData(wikidataJson);

        for(const wikiDataKey in wikiData){

            animalMarkdown.data[wikiDataKey] = wikiData[wikiDataKey];
        }

        for(const key in animalMarkdown.data){

            if(undefined === animalMarkdown.data[key]){
                animalMarkdown.data[key] = null;
            }

        }

        for(const key in animalMarkdown.data.i18nNames){

            if(undefined === animalMarkdown.data.i18nNames[key]){
                animalMarkdown.data.i18nNames[key] = null;
            }

        }

        delete animalMarkdown.data.latin
        delete animalMarkdown.data.wikipedia

        fs.writeFileSync(animalFilePath, frontmatter.stringify(animalMarkdown),{encoding:'utf-8'});

    }

}

loopData();



