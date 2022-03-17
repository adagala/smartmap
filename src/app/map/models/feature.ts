export interface Features {
    type: string;
    features: Feature[];
}

export interface Feature {
    id: string;
    properties: Properties;
    type: FeatureType;
    geometry: Geometry;
}

export interface Geometry {
    type: ShapeEnum;
    coordinates: Array<Array<Array<number[] | number>>>;
}

export enum ShapeEnum {
    MultiPolygon = "MultiPolygon",
    Polygon = "Polygon",
}

export interface Properties {
    LSAD: Lsad;
    NAME: string;
    bbox: number[];
    type: PurpleType;
    ALAND: number;
    CSAFP: string;
    GEOID: string;
    color: string;
    metro: string;
    state: number;
    AWATER: number;
    CBSAFP: string;
    cluster: boolean;
    AFFGEOID: string;
    stateCode: string;
    synthetic: boolean;
    background: string;
    background_hover: string;
    market?: number;
    name?: string;
    shape?: ShapeEnum;
    category?: string;
}

export enum Lsad {
    M1 = "M1",
    M2 = "M2",
}

export enum PurpleType {
    Market = "market",
}

export enum FeatureType {
    Feature = "Feature",
}
