export interface HTTPResponseUsers {
    status_code: number;
    message:     string;
    data:        Datum[];
}

export interface HTTPResponseUser {
    status_code: number;
    message:     string;
    data:        Datum;
}

export interface Datum {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    confirmed:         boolean;
    isActive:          boolean;
    isVerified:        boolean;
    created_at:        Date;
    updated_at:        Date;
}
