export interface LeadStatusResult {
    count:    number;
    next:     null;
    previous: null;
    results:  LeadStatus[];
}

export interface LeadStatus {
    id:             number;
    name:           string;
    description:    string;
    color:          string;
    order_position: number;
    is_active:      boolean;
    created_at:     Date;
    updated_at:     Date;
}
