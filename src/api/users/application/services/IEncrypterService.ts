export interface IEncrypterService {
    hashPassword(password: string): string;
    authPassword(pass:string, passwordEncode: string): boolean;
}