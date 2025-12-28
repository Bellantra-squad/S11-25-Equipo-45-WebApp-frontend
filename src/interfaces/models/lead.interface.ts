import { Category } from "./category.interface";
import { Contact } from "./contact.interface";
import { LeadStatus } from "./lead-status.interfaces";
import { Tag } from "./tag.interface";
import { User } from "./user.interface";

export interface paginationLead {
    count:    number;
    next:     string;
    previous: null;
    results:  LeadResponse[];
}

export interface LeadResponse {
    id:                number;
    company_name:      string;
    industry:          string;
    website:           string;
    category:          Category;
    status:            LeadStatus;
    assigned_to:       User;
    is_client:         boolean;
    lead_source:       LeadSource;
    lead_score:        number;
    estimated_value:   string;
    notes?:             string;
    contacts_count:    number;
    tags:              Tag[];
    last_contact_date: Date;
    next_follow_up:    Date;
    created_at:        Date;
    updated_at:        Date;
}

export interface Lead {
    id:                     number;
    company_name:           string;
    industry:               string;
    website:                string;
    category:               Category;
    status:                 LeadStatus;
    assigned_to:            User;
    is_client:              boolean;
    lead_source:            LeadSource;
    lead_score:             number;
    estimated_value:        string;
    notes:                  string;
    contacts:               Contact[];
    tags:                   Tag[];
    last_contact_date:      Date;
    next_follow_up:         Date;
    converted_to_client_at: null;
    created_at:             Date;
    updated_at:             Date;
}


export interface LeadUpdate {
    company_name?:      string;
    industry?:          string;
    website?:           string;
    category_id?:       number;
    status_id?:         number;
    assigned_to_id?:    number;
    is_client?:         boolean;
    lead_source?:       string;
    lead_score?:        number;
    estimated_value?:   string;
    notes?:             string;
    tag_ids?:           number[];    
}



export enum LeadSource {
    ColdCall = "cold_call",
    Referral = "referral",
    SocialMedia = "social_media",
    Website = "website",
}
