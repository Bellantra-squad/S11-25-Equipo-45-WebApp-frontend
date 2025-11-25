export interface Category {
    id:              number;
    name:            string;
    description:     string;
    color:           string;
    created_at:      Date;
    updated_at:      Date;
    order_position?: number;
    is_active?:      boolean;
}