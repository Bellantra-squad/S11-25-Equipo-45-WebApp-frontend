import { Tag } from "./tag.interface";


export interface PaginationContact {
  count:    number;
  next:     string;
  previous: null;
  results:  Contact[];
}

export interface Contact {
  id:                number;
  lead:              number;
  first_name:        string;
  last_name:         string;
  email:             string;
  phone:             string;
  whatsapp_number:   string;
  position:          string;
  department:        string;
  is_primary:        boolean;
  is_decision_maker: boolean;
  notes:             string;
  tags:              Tag[];
  created_at:        Date;
  updated_at:        Date;
}

export interface ContactRequest {   
  first_name:        string;
  last_name:         string;
  email:             string;
  phone:             string;
  whatsapp_number:   string;
  position:          string;
  department:        string; 
}

