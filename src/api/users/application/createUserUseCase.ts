import UserRepository from "../domain/userRepository";
import { IEncrypterService } from "./services/IEncrypterService";
import { User, WebhooksDetails } from "../domain/user"

export class CreateUserUseCase {
   constructor(
      readonly userRepository: UserRepository,
      readonly encrypterService: IEncrypterService
   ){}

   async run(
      name: string,
      lastName: string,
      badgeNumber: string,
      password: string,
      role: string,
      webhooksDetails?: WebhooksDetails
   ): Promise<User | null> {
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
      } catch (error){
         return null
      }
   }
}