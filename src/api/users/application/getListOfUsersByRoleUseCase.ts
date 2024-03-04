import UserRepository from "../domain/userRepository";

export class GetListOfUsersByRoleUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async run(role: string) {
        return await this.userRepository.getListOfUsersByRole(role);
    }
}