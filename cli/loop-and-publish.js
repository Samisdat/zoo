const fs = require("fs");
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require('crypto')

const dataDir = path.resolve(process.env.PWD, 'data/markdown/animals');

const animals = fs.readdirSync(dataDir);

const frontmatter = require('@github-docs/frontmatter')

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

        animalMarkdown.data.published = (animalMarkdown.data.facility !== undefined);

        console.log(animalMarkdown.data.published)

        fs.writeFileSync(animalFilePath, frontmatter.stringify(animalMarkdown),{encoding:'utf-8'});

    }

}

loopData();



