export interface IFeatures {
    type: string;
    features: IFeature[];
}

export interface IFeature {
    id: string;
    properties: IProperties;
    type: FeatureType;
    geometry: IGeometry;
}

export interface IGeometry {
    type: ShapeEnum;
    coordinates: Array<Array<Array<number[] | number>>>;
}

export enum ShapeEnum {
    MultiPolygon = "MultiPolygon",
    Polygon = "Polygon",
}

export interface IProperties {
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
