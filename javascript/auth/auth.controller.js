import { Router } from "express";
import AuthService from "./auth.service.js";

const authService = new AuthService();
const authRouter = Router();

authRouter.post("/sign-in", async (req, res) => {
    const { login, password } = req.body;

    try{
        const token = await authService.signIn(login, password);
        console.log(token);
    }
    catch (e){
        res.status(400).json({message: e.message});
    }
})

authRouter.post("/sign-up", async (req, res) => {
    const { nome, genero, cargo, email, senha } = req.body;

    try{
        const newUser = await authService.signUp(nome, cargo, genero, email, senha);
    } catch(e){
        res.status(400).json({message: e.message});
    }
})

authRouter.get()

export default authRouter;