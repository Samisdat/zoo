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



    //https://upload.wikimedia.org/wikipedia/commons/5/54/Testudo_kleinmanni.jpg
    return{
        wikipediaLink: wikipediaLink,
        images:images,
        scientificName:scientificName
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

        console.log(wikiData)


        break;

    }

}

loopData();



