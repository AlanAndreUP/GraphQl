import { User } from "../domain/user";
import UserRepository  from "../domain/userRepository";
import { Users } from "./model/userModel";

export default class MongooseRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        const check = await Users.findOne({badgeNumber: user.badgeNumber});
        if(check) { throw new Error("El usuario ya existe") }
        const result = await Users.create(user);
        return result;
    }
    async deleteUser(_id: string | object): Promise<User> {
        const result = await Users.findByIdAndDelete(_id);
        if(!result) { throw new Error("No se encontro el usuario") }
        return result;
    }
    async editUser(_id: string | object, user: User): Promise<User> {
        const result = await Users.findByIdAndUpdate(_id, user, {new: true});
        if(!result) { throw new Error("No se encontro el usuario") }
        return result;
    }
    async getListOfUsersByRole(role: string): Promise<User[]> {
        const result = await Users.find({role: role});
        return result;
    }
    async loginUser(user: User): Promise<User> {
        const result = await Users.findOne({badgeNumber: user.badgeNumber});
        if(!result) { throw new Error("No se encontro el usuario") }
        return result;
    }
}
