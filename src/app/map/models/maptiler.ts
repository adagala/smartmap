export interface Maptiler {
    version: number;
    id: string;
    name: string;
    sources: Sources;
    layers: Layer[];
    metadata: MaptilerMetadata;
    glyphs: string;
    sprite: string;
    bearing: number;
    pitch: number;
    center: number[];
    zoom: number;
}

export interface Layer {
    id: string;
    type: Type;
    layout?: Layout;
    paint: Paint;
    source?: Source;
    "source-layer"?: string;
    filter?: Array<Array<Array<string[] | number | string> | number | string> | FilterEnum>;
    maxzoom?: number;
    metadata?: LayerMetadata;
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

export interface Layout {
    visibility?: Visibility;
    "line-cap"?: LineCap;
    "line-join"?: LineJoin;
    "text-font"?: TextFont[];
    "text-size"?: TextSizeClass | number;
    "text-field"?: string;
    "text-max-width"?: number;
    "symbol-placement"?: FillOutlineColor | Type;
    "icon-image"?: FillOutlineColor | string;
    "text-anchor"?: string;
    "text-offset"?: number[];
    "text-padding"?: number;
    "icon-size"?: IconSizeClass | number;
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

export interface FillOutlineColor {
    base: number;
    stops: Array<Array<number | string>>;
}

export interface IconSizeClass {
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

export interface TextSizeClass {
    base?: number;
    stops: Array<number[]>;
}

export enum Visibility {
    None = "none",
    Visible = "visible",
}

export interface LayerMetadata {
}

export interface Paint {
    "background-color"?: BackgroundColor;
    "fill-color"?: string[] | FillOutlineColor | string;
    "fill-opacity"?: TextSizeClass | number;
    "line-color"?: string[] | FillOutlineColor | string;
    "line-opacity"?: TextSizeClass | number;
    "line-dasharray"?: number[];
    "fill-antialias"?: boolean;
    "line-width"?: TextSizeClass | number;
    "fill-pattern"?: string;
    "fill-outline-color"?: FillOutlineColor;
    "fill-extrusion-base"?: FillExtrusion;
    "fill-extrusion-color"?: string;
    "fill-extrusion-height"?: FillExtrusion;
    "fill-extrusion-opacity"?: number;
    "line-gap-width"?: TextSizeClass | number;
    "line-offset"?: number;
    "text-color"?: string;
    "text-halo-color"?: TextHaloColor;
    "text-halo-width"?: number;
    "text-halo-blur"?: number;
    "icon-opacity"?: number;
}

export interface BackgroundColor {
    stops: Array<Array<number | string>>;
}

export interface FillExtrusion {
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

export interface MaptilerMetadata {
    "mapbox:type": string;
    "maptiler:copyright": string;
    "openmaptiles:version": string;
}

export interface Sources {
    metros: Metros;
    states: Metros;
    landcover: Landcover;
    openmaptiles: Landcover;
    maptiler_attribution: MaptilerAttribution;
}

export interface Landcover {
    url: string;
    type: string;
}

export interface MaptilerAttribution {
    attribution: string;
    type: string;
}

export interface Metros {
    data: string;
    type: string;
}
