import { Category } from "./category.interface";
import { User } from "./user.interface";

export interface paginationLead {
    count:    number;
    next:     string;
    previous: null;
    results:  Lead[];
}

export interface Lead {
    id:                number;
    company_name:      string;
    industry:          string;
    website:           string;
    category:          Category;
    status:            Category;
    assigned_to:       User;
    is_client:         boolean;
    lead_source:       LeadSource;
    lead_score:        number;
    estimated_value:   string;
    contacts_count:    number;
    tags:              Category[];
    last_contact_date: Date;
    next_follow_up:    Date;
    created_at:        Date;
    updated_at:        Date;
}



export enum LeadSource {
    ColdCall = "cold_call",
    Referral = "referral",
    SocialMedia = "social_media",
    Website = "website",
}
