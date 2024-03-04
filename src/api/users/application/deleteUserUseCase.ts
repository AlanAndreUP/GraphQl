import UserRepository from "../domain/userRepository";

export class DeleteUserUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(_id: string | object) {
        const result = await this.userRepository.deleteUser(_id)
        return result
    }
}