import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/loginUserUseCase";
import signale from "signale";


/*
const loginUserController = async (req: Request, res: Response): Promise<any> => {
    try {
        const user: User = req.body;
        const userFound = await loginUser(user);
        const isCorrectPassword = await bcrypt.compare(user.password, userFound.password);
        console.log(userFound.password, user.password, isCorrectPassword)
        
        if(!isCorrectPassword) {
            return res.status(401).send({ message: "Contraseña incorrecta" });
        }

        const token = createToken(userFound.badgeNumber);
        return res.status(201).json({ token, userFound });
    } catch (error: any) {
        signale.fatal(new Error("Error al iniciar sesión"));
        res.status(404).send({ message: "Error al iniciar sesión", errors: error.message });
    }
} */

export class LoginUserController {
    constructor(readonly loginUserUseCase: LoginUserUseCase ){}
    
    async run(req: Request, res: Response){
        try {
            if(!process.env.SALT_ROUNDS_BCRYPT){
                return res.status(500).send({ message: "No hay variables de entorno" });
            }
            
            const user = await this.loginUserUseCase.run(
                req.body.name,
                req.body.lastName,
                req.body.badgeNumber,
                req.body.password,
                req.body.role
            )

            return res.status(201).json(user);
        } catch (error) {
            signale.fatal(new Error("Error al crear el usuario"));
            console.log("Error en el controlador de crear usuario" + error);
        }
    }
}
