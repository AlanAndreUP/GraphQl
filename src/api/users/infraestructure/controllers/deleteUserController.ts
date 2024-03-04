import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../application/deleteUserUseCase";
import signale from "signale";

export class DeleteUserController{
    constructor(readonly deleteUserUseCase: DeleteUserUseCase){}

    async run(req: Request, res: Response){
        try{
            const _id = req.params._id;
            await this.deleteUserUseCase.run(_id);
            return res.status(204).json({message: "Usuario eliminado"});
        } catch(error){
            signale.fatal(new Error("Error al eliminar el usuario"))
            res.status(404).send({ message: "Error al eliminar el usuario" })
        }
    }
}