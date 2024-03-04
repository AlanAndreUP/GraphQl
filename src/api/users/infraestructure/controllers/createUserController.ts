import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/createUserUseCase";
import signale from "signale";

export class CreateUserController {
    constructor(readonly createUserUseCase: CreateUserUseCase ){}
    
    async run(req: Request, res: Response){
        try {
            if(!process.env.SALT_ROUNDS_BCRYPT){
                return res.status(500).send({ message: "No hay variables de entorno" });
            }
            const user = await this.createUserUseCase.run(
                req.body.name,
                req.body.lastName,
                req.body.badgeNumber,
                req.body.password,
                req.body.role,
                req.body.webhooksDetails
            );
            if(user){
                /*const token = TokenService.createToken(user.badgeNumber);
                return res.status(201).json({ token, user });*/
                let webhooksUrl = "";
                if(user.webhooksDetails?.eventName == "newUserCreated"){
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
                return res.status(201).json(user);                
            } else{
                return res.status(500).send({ message: "Error al crear el token" });
            }
        } catch (error) {
            signale.fatal(new Error("Error al crear el usuario"));
            console.log("Error en el controlador de crear usuario" + error);
        }
    }
}