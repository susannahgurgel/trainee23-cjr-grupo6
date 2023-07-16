import { Router } from "express";
import AuthService from "./auth.service.js";
import User from "../user/user.service.js"

const authService = new AuthService();
const authRouter = Router();

authRouter.post("/sign-in", async (req, res) => {
    const { login, password } = req.body;
    console.log("oi")
    try{
        const token = await authService.signIn(login, password);
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

authRouter.get("/:username", async(req,res) => {
    try{const {username} = req.params;
        var user = new User();
        var foundUser = await user.findByUsername(username);
        res.json({
            username: foundUser.username,
            image: foundUser.image,
            email: foundUser.email,
            cargo: foundUser.cargo
        })} catch(e){
            res.status(400).json({message: e.message});
        }
})

authRouter.get("/:username/:image", async(req,res) => {
    const {image} = req.params;
    res.sendFile(image, { root: '../img/' });
})

export default authRouter;