import {User} from "./user";

export default interface UserRepository {
    createUser(user: User): Promise<User>
    getListOfUsersByRole(role: string): Promise<User[]>
    deleteUser(_id: string | object): Promise<User>
    editUser(_id: string | object, user: User): Promise<User>
    loginUser(user: User): Promise<User>
}