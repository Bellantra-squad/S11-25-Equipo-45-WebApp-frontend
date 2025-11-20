export interface Contact {
  id: number; 
  name: string; 
  email: string; 
  phone?: string;
  lead?: number;
  is_primary: boolean;
  is_decision_maker: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  lead?: number;
  is_primary?: boolean;
  is_decision_maker?: boolean;
}