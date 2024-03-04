import { Request, Response } from "express";
import { User } from "../../domain/user";
import { GetListOfUsersByRoleUseCase } from "../../application/getListOfUsersByRoleUseCase";
import signale from "signale";

export class GetListOfUsersByRoleController{
    constructor(readonly getListOfUsersByRoleUseCase: GetListOfUsersByRoleUseCase){}


    async run(req: Request, res: Response){
        try{
            const role = req.params.role;
            signale.info("Obteniendo lista de usuarios por rol");
            const users: User[] = await this.getListOfUsersByRoleUseCase.run(role);
            return res.status(200).json({ message: "Lista de usuarios por rol", Users: users });
        } catch (error){
            signale.fatal(new Error("Error al obtener la lista de usuarios por rol"));
            res.status(404).send({ message: "No se encontró usuarios con ese rol" });
        }
    }
}