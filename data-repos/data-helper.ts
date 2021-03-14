import path from "path";
import * as fs from "fs";

const rootDataDir = path.resolve(process.env.PWD as string, 'data-repos');

export type DataType = 'markdown' | 'geojson';

export const getDataDir = (dataType: DataType, dataSubDir:string): string =>{

    const dataDir = path.resolve(
        rootDataDir,
        dataType,
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

export const getFileNames = async (dataType:DataType, dataSubDir:string): Promise<string[]> => {

    const dataDir = getDataDir(dataType, dataSubDir);

    let files = await fs.readdirSync(dataDir)

    files = files.filter((file)=>{

        if('.DS_Store' === file){
            return false
        }

        return true;

    });

    return files;

};