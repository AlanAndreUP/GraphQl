import { Request, Response } from "express";
import { EditUserUseCase } from "../../application/editUserUseCase";
import signale from "signale";

/*const editUserController = async (req: Request, res: Response): Promise<any> => {
    try{
        const _id = req.params._id;
        const user: User = {
            name: req.body.name,
            lastName: req.body.lastName,
            badgeNumber: req.body.badgeNumber,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS_BCRYPT!)),
            role: req.body.role
        };
        const editedUser: User = await editUser(_id, user);
        return res.status(201).json({ message: "Usuario editado", editedUser });
    } catch (error){
        signale.fatal(new Error("Error al editar el usuario"))
        res.status(404).send({ message: "No se encontró el usuario" })
    }
}

export default editUserController*/

export class EditUserController{
    constructor(readonly editUserUseCase: EditUserUseCase){}

    async run(req:Request, res:Response){
        try{
            if(!process.env.SALT_ROUNDS_BCRYPT){
                return res.status(500).send({ message: "No hay variables de entorno" });
            }

            const user = await this.editUserUseCase.run(
                req.body._id,
                req.body.name,
                req.body.lastName,
                req.body.badgeNumber,
                req.body.password,
                req.body.role,
                req.body.webhooksDetails
            )

            if(user){
                let webhooksUrl = "";
                if(user.webhooksDetails?.eventName == "userEdited"){
                    webhooksUrl = user.webhooksDetails.url;
                    const response = await fetch(webhooksUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                    if(response.ok){
                        signale.success("Data enviada al webhook");
                    }
                }
            }
            
            return res.status(201).json(user);
        } catch(error){
            signale.fatal(new Error("Error al editar el usuario"));
            console.log("Error en el controlador de editar usuario" + error);
        }
    }
}