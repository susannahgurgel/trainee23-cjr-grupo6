import { Router } from "express";
import AuthService from "./auth.service.js";

const authService = new AuthService();
const authRouter = Router();

authRouter.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    try{
        const token = await authService.signIn(email, password);
    }
    catch (e){
        res.status(400).json({message: e.message});
    }
})

authRouter.post("/sign-up", async (req, res) => {
    const { nome, cargo, email, senha } = req.body;

    try{
        const newUser = await authService.signUp(nome, cargo, email, senha);
    } catch(e){
        res.status(400).json({message: e.message});
    }
})