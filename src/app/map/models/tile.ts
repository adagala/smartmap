export interface ITiles {
    id: string;
    bounds: number[];
    center: number[];
    format: string;
    version: string;
    tilejson: string;
    generator: string;
    planettime: string;
    attribution: string;
    description: string;
    pixel_scale: string;
    name: string;
    minzoom: number;
    maxzoom: number;
    vector_layers: IVectorLayer[];
    crs: string;
    crs_wkt: string;
    extent: number[];
    tiles: string[];
}

export interface IVectorLayer {
    id: string;
    minzoom: number;
    maxzoom: number;
    description: string;
    fields: { [key: string]: Field };
}

export enum Field {
    Boolean = "Boolean",
    Number = "Number",
    String = "String",
}
