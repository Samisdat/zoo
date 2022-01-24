export interface Position{
    x:number;
    y:number;
}

export interface Edge{
    id: string;
    d: string;
    length: number;
    startPos: Position;
    endPos: Position;
}