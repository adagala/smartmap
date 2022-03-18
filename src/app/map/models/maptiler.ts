export interface IMaptiler {
    version: number;
    id: string;
    name: string;
    sources: ISources;
    layers: ILayer[];
    metadata: IMaptilerMetadata;
    glyphs: string;
    sprite: string;
    bearing: number;
    pitch: number;
    center: number[];
    zoom: number;
}

export interface ILayer {
    id: string;
    type: Type;
    layout?: ILayout;
    paint: IPaint;
    source?: Source;
    "source-layer"?: string;
    filter?: Array<Array<Array<string[] | number | string> | number | string> | FilterEnum>;
    maxzoom?: number;
    metadata?: ILayerMetadata;
    minzoom?: number;
}

export enum FilterEnum {
    All = "all",
    CableCar = "cable_car",
    Cemetery = "cemetery",
    Class = "class",
    Empty = "==",
    Hospital = "hospital",
    Polygon = "Polygon",
    School = "school",
    Type = "$type",
}

export interface ILayout {
    visibility?: Visibility;
    "line-cap"?: LineCap;
    "line-join"?: LineJoin;
    "text-font"?: TextFont[];
    "text-size"?: ITextSizeClass | number;
    "text-field"?: string;
    "text-max-width"?: number;
    "symbol-placement"?: IFillOutlineColor | Type;
    "icon-image"?: IFillOutlineColor | string;
    "text-anchor"?: string;
    "text-offset"?: number[];
    "text-padding"?: number;
    "icon-size"?: IIconSizeClass | number;
    "icon-rotate"?: number;
    "icon-padding"?: number;
    "symbol-spacing"?: number;
    "icon-rotation-alignment"?: string;
    "symbol-avoid-edges"?: boolean;
    "text-rotation-alignment"?: string;
    "text-optional"?: boolean;
    "text-transform"?: string;
    "text-letter-spacing"?: number;
    "icon-optional"?: boolean;
    "icon-allow-overlap"?: boolean;
    "text-justify"?: string;
}

export interface IFillOutlineColor {
    base: number;
    stops: Array<Array<number | string>>;
}

export interface IIconSizeClass {
    stops: Array<number[]>;
}

export enum LineCap {
    Butt = "butt",
    Round = "round",
}

export enum LineJoin {
    Miter = "miter",
    Round = "round",
}

export enum Type {
    Background = "background",
    Fill = "fill",
    FillExtrusion = "fill-extrusion",
    Line = "line",
    Symbol = "symbol",
}

export enum TextFont {
    NotoSansItalic = "Noto Sans Italic",
    NotoSansRegular = "Noto Sans Regular",
    RobotoCondensedItalic = "Roboto Condensed Italic",
    RobotoMedium = "Roboto Medium",
    RobotoRegular = "Roboto Regular",
}

export interface ITextSizeClass {
    base?: number;
    stops: Array<number[]>;
}

export enum Visibility {
    None = "none",
    Visible = "visible",
}

export interface ILayerMetadata {
}

export interface IPaint {
    "background-color"?: IBackgroundColor;
    "fill-color"?: string[] | IFillOutlineColor | string;
    "fill-opacity"?: ITextSizeClass | number;
    "line-color"?: string[] | IFillOutlineColor | string;
    "line-opacity"?: ITextSizeClass | number;
    "line-dasharray"?: number[];
    "fill-antialias"?: boolean;
    "line-width"?: ITextSizeClass | number;
    "fill-pattern"?: string;
    "fill-outline-color"?: IFillOutlineColor;
    "fill-extrusion-base"?: IFillExtrusion;
    "fill-extrusion-color"?: string;
    "fill-extrusion-height"?: IFillExtrusion;
    "fill-extrusion-opacity"?: number;
    "line-gap-width"?: ITextSizeClass | number;
    "line-offset"?: number;
    "text-color"?: string;
    "text-halo-color"?: TextHaloColor;
    "text-halo-width"?: number;
    "text-halo-blur"?: number;
    "icon-opacity"?: number;
}

export interface IBackgroundColor {
    stops: Array<Array<number | string>>;
}

export interface IFillExtrusion {
    type: string;
    property: string;
}

export enum TextHaloColor {
    Ffffff = "#ffffff",
    RGBA2552552550 = "rgba(255,255,255,0)",
    RGBA25525525507 = "rgba(255,255,255,0.7)",
    RGBA25525525508 = "rgba(255,255,255,0.8)",
}

export enum Source {
    Landcover = "landcover",
    Metros = "metros",
    Openmaptiles = "openmaptiles",
    States = "states",
}

export interface IMaptilerMetadata {
    "mapbox:type": string;
    "maptiler:copyright": string;
    "openmaptiles:version": string;
}

export interface ISources {
    metros: IMetros;
    states: IMetros;
    landcover: ILandcover;
    openmaptiles: ILandcover;
    maptiler_attribution: IMaptilerAttribution;
}

export interface ILandcover {
    url: string;
    type: string;
}

export interface IMaptilerAttribution {
    attribution: string;
    type: string;
}

export interface IMetros {
    data: string;
    type: string;
}
