export class Marker {
    private _lat: number;
    private _lng: number;
    private _isWithin: boolean;

    constructor(lat: number, lng: number, isWithin: boolean) {
        this._lat = lat;
        this._lng = lng;
        this._isWithin = isWithin;
    }

    get lat(): number {
        return this._lat;
    }
    get lng(): number {
        return this._lng;
    }

    public setLatLng(lat: number, lng: number):void {
        this._lat = lng;
        this._lng = lng;
    }

    get isWithin(): boolean {
        return this._isWithin;
    }

    set isWithin(value: boolean) {
        this._isWithin = value;
    }
}
