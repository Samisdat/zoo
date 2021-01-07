const fs = require("fs");
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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

const searchAll = async () => {

    for(const animal of animals){

        const animalFilePath = path.resolve(dataDir, animal);
        const animalFile = fs.readFileSync(animalFilePath, {encoding:'utf-8'});

        const animalMarkdown = frontmatter(animalFile);

        if(null === animalMarkdown.data.wikidata){
            continue;
        }

        const wikidataId = animalMarkdown.data.wikidata;

        const wikidataFilePath = path.resolve(wikidataDir, wikidataId + '.json');

        if (true === fs.existsSync(wikidataFilePath)) {
            console.log(animalFilePath, 'gibbet')

            continue;
        }
        
        const wikidata = await wikidataSearch(wikidataId);

        fs.writeFileSync(
            wikidataFilePath,
            JSON.stringify(wikidata, null, 4),
            {encoding:'utf-8'}
        );


    }

}

searchAll();



