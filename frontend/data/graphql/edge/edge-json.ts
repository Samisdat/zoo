export interface EdgeJson {
    id:number;
    IdFromSvg: string;
    d: string;
    edgeLength: number;
    startNode: number | undefined | null;
    endNode: number | undefined | null;
}