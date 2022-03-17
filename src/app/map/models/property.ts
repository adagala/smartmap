import { Geocode } from './geocode';

export interface PropertyItem {
    listID: number;
    propertyID: number;
    yearBuilt: number;
    yearRenovated: number;
    name: string;
    streetAddress: string;
    neighborhood: string;
    phone: string;
    city: string;
    adminFee: number;
    appFee: number;
    url: string;
    favorite: boolean;
    notes: string;
    specials: string;
    parking: Parking;
    schoolsInfo: SchoolsInfo;
    petInfo: PetInfo;
    paidUtilities: string[];
    floorplans: Floorplan[];
    highValueAmenities: string[];
    unitAmenities: string[];
    propertyAmenities: string[];
    geocode: Geocode;
    photos: string[];
    section8: boolean;
    studentHousting: boolean;
    seniorHousing: boolean;
    officeHours: null;
    numUnits: number;
    email: null;
    role: string;
    management: null;
    managementOffices: any[];
    regionalName: null;
    regionalPhone: null;
    regionalEmail: null;
    onsiteManager: null;
}

export interface Floorplan {
    floorplanID: number;
    bed: number;
    bath: number;
    sqft: number;
    deposit: number;
    photoUrl: string;
    washerDryer: string;
    price: number;
    priceMax: number;
    den: boolean;
    isAvailable: boolean;
    available: string;
    comments: string;
}

export interface Parking {
    propertyID: number;
    reserved: boolean;
    reservedFeeMin: number;
    reservedFeeMax: number;
    covered: boolean;
    coveredFeeMin: number;
    coveredFeeMax: number;
    garage: boolean;
    garageFeeMin: number;
    garageFeeMax: number;
    detached: boolean;
    detachedFeeMin: number;
    detachedFeeMax: number;
    breezeway: boolean;
    attached: boolean;
}

export interface PetInfo {
    allowed: boolean;
    extraRent: number;
    limit: number;
    weight: number;
    breedRestriction: boolean;
    nonRefundableFee: number;
}

export interface SchoolsInfo {
    propertyID: number;
    district: string;
    elementry: string;
    intermediate: string;
    middle: string;
    high: string;
}
