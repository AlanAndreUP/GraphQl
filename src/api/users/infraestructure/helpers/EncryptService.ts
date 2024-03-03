import { IEncrypterService } from "../../application/services/IEncrypterService";
import bcrypt from 'bcrypt';
export class EncryptService implements IEncrypterService {
    public hashPassword(password: string): string {         
        return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS_BCRYPT!))
    }
    public authPassword(pass:string, passwordEncode: string): boolean {
        return bcrypt.compareSync(pass, passwordEncode)
    }
}