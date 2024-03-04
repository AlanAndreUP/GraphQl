import { User, WebhooksDetails } from "../domain/user";
import UserRepository from "../domain/userRepository";
import { IEncrypterService } from "./services/IEncrypterService";

export class EditUserUseCase {
    constructor(
        readonly userRepository: UserRepository,
        readonly encrypterService: IEncrypterService){}
    async run(
        _id: string | object,
        name: string,
        lastName: string,
        badgeNumber: string,
        password: string,
        role: string,
        webhooksDetails?: WebhooksDetails
    ) {
        try{
            const user = new User(
                name,
                lastName,
                badgeNumber,
                this.encrypterService.hashPassword(password),
                role,
                webhooksDetails
            );
            return user
        } catch(error){
            return null
        }
    }
}