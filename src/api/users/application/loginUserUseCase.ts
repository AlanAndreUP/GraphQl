import UserRepository from "../domain/userRepository";
import { IEncrypterService } from "./services/IEncrypterService";
import { User } from "../domain/user";

export class LoginUserUseCase {
    constructor(
        readonly userRepository: UserRepository,
        readonly encrypterService: IEncrypterService
    ){}
    async run(
        name: string,
        lastName: string,
        badgeNumber: string,
        password: string,
        role: string
    ): Promise<User | null>{
        try{
            const user = new User(
                name,
                lastName,
                badgeNumber,
                password,
                role
            );
            return user
        } catch(error){
            return null
        }
    }
}