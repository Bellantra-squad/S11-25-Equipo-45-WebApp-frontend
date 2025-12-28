export interface IntegrationAPI {
    id:                  number;
    service_name:        string;
    credential_type:     CredentialType;
    webhook_url:         string;
    phone_number_id:     string;
    business_account_id: string;
    additional_config:   AdditionalConfig;
    is_active:           boolean;
    expires_at:          Date | null;
    created_at:          Date;
    updated_at:          Date;
}

export interface AdditionalConfig {
    version?:     string;
    region?:      string;
    environment?: string;
}

export enum CredentialType {
  WhatsApp = "whatsapp",
  EmailSmtp = "email_smtp",
  EmailBrevo = "email_brevo",
  Other = "other",
}