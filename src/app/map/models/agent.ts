import { IGeocode } from './geocode';

export interface Agent {
    agentInfo: IAgentInfo;
    records: IRecord[];
    showContactInfo: boolean;
    role: string;
    title: string;
    body: string;
}

export interface IAgentInfo {
    accountID: number;
    firstname: string;
    lastname: string;
    company: string;
    splashMessage: string;
    customHeader: string;
}

export interface IRecord {
    listID?: number;
    order?: number;
    propertyID?: number;
    name?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    pets?: boolean;
    washerDry?: string;
    photo?: string;
    favorite?: boolean;
    highestSentCommissions?: number;
    onsiteManager?: string;
    management?: string;
    proximity?: number;
    section8?: boolean;
    seniorHousing?: boolean;
    studentHousting?: boolean;
    floorplans?: any[];
    highValueAmenities?: string[];
    paidUtilities?: string[];
    geocode?: IGeocode;
}
