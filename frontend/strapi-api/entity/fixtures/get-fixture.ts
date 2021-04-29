import path from "path";

const fs = require('fs');
const FIXTURES_BASE_DIR = `${__dirname}/`;

const FIXTURES_ROOT_BASE_DIR = path.resolve(
    FIXTURES_BASE_DIR,
    '../../__fixtures__/'
);

export const getFixture = async (dir:string, fixture:string):Promise<any> => {

    const fixturePath = path.resolve(
        FIXTURES_BASE_DIR,
        dir,
        fixture
    );

    const fixtureContent = await fs.readFileSync(fixturePath, {encoding: 'utf8'});

    return JSON.parse(fixtureContent);

}

export const getRootFixture = async (fixture:string):Promise<any> => {

    const fixturePath = path.resolve(
        FIXTURES_ROOT_BASE_DIR,
        fixture
    );

    const fixtureContent = await fs.readFileSync(fixturePath, {encoding: 'utf8'});

    return JSON.parse(fixtureContent);

}
