export interface RecoveryRequest {
    email: string;
}

export interface ChangedPassword {
    token: string;
    password: string;
}
