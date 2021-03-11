import path from "path";
import * as fs from "fs";

const rootDataDir = path.resolve(process.env.PWD as string, 'data-repos/markdown');

export const getDataDir = (dataSubDir:string) :string =>{

    const dataDir = path.resolve(
        rootDataDir,
        dataSubDir
    );

    try {
        fs.lstatSync(dataDir).isDirectory()
    }
    catch (e){
        throw new Error(`dir [${dataDir}] does not exist`)
    }

    return dataDir;
};
