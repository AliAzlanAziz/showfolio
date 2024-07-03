export class UserResetPasswordModel {
    email: string;
    code: string;
    token: string;
    password: string;
    confirmPassword: string;
    oldPassword: string;
}