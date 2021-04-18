import path from "path";

const fs = require('fs');
const FIXTURES_BASE_DIR = `${__dirname}/`;

export const getFixture = async (dir:string, fixture:string):Promise<any> => {

    const fixturePath = path.resolve(
        FIXTURES_BASE_DIR,
        dir,
        fixture
    );

    const fixtureContent = await fs.readFileSync(fixturePath, {encoding: 'utf8'});

    return JSON.parse(fixtureContent);

}
