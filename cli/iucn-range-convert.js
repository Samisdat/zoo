const fs = require("fs");
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const frontmatter = require('@github-docs/frontmatter')

const dataImportDir = path.resolve(process.env.PWD, 'iucnredlist-raw');
const dataExportDir = path.resolve(process.env.PWD, 'data-repos/geojson/iucnredlist');

const convertShapeFile = async function (filename) {
    try{
        const { stdout, stderr } = await exec('./node_modules/.bin/shp2json ' + filename, {maxBuffer: 1024 * 100 * 1000});

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
        //console.log(e);
        console.log('./node_modules/.bin/shp2json ' + filename)
        process.exit(1);
    }

}

const loadAnimalSlugsByScientificName = async () => {

    const animalData = {};


    const dataDir = path.resolve(process.env.PWD, 'data/markdown/animals');
    const animals = fs.readdirSync(dataDir);

    for(const animal of animals){

        const animalFilePath = path.resolve(dataDir, animal);

        const animalFile = fs.readFileSync(animalFilePath, {encoding:'utf-8'});

        if (false === fs.existsSync(animalFilePath)) {
            console.log('animalfile does not exist', animalFile);

            continue;
        }

        const animalMarkdown = frontmatter(animalFile);

        if(null === animalMarkdown.data.iucnID){
            continue;
        }

        animalData[animalMarkdown.data.iucnID] = animalMarkdown.data.slug;

    }



    return animalData;

}


const convertAll = async () => {

    const slugsByScientificName = await loadAnimalSlugsByScientificName();

    console.log(slugsByScientificName)

    for(const content of fs.readdirSync(dataImportDir)){

        if(false === fs.lstatSync(path.resolve(dataImportDir, content)).isDirectory()){
            continue;
        }

        const shapeFile =  path.resolve(dataImportDir, content, 'data_0.shp');

        if(false === fs.existsSync(shapeFile)){
            console.log(content, 'does not contain a data_0.shp');
            continue;
        }

        const geoJson = await convertShapeFile(shapeFile);

        if(undefined === geoJson){
            console.log(shapeFile, 'was not convertable to geojson');
            continue;

        }

        const id = geoJson.features[0].properties.ID_NO;

        console.log(geoJson.features[0].properties);
        console.log(geoJson.features[0].properties.ID_NO);

        const slug = slugsByScientificName[id];

        if(!slug){
            console.log(id, 'was not found, no  slug could be resloved');
            continue;
        }


        const geoJsonFile = path.resolve(
            dataExportDir,
            slug + '.json');

        if (true === fs.existsSync(geoJsonFile)) {
            console.log(geoJsonFile, 'gibbet')

            continue;
        }


        fs.writeFileSync(
            geoJsonFile,
            JSON.stringify(geoJson, null, 4),
            {encoding:'utf-8'}
        );



    }

}

convertAll();



