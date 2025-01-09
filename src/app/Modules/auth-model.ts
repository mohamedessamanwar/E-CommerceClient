export interface IAuthModel {
    message: string;
    isAuthenticated: boolean;
    username: string;
    email: string;
    roles: string[];
    token: string;
    expiresOn: Date; // Date is used instead of DateTime
}
