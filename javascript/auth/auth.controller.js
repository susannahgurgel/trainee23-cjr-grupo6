import { Router } from "express";
import AuthService from "./auth.service.js";
import User from "../user/user.service.js"
import jwtGuard from "./guards/jwt.guard.js"

const authService = new AuthService();
const authRouter = Router();

authRouter.post("/sign-in", async (req, res) => {
    const { login, password } = req.body;

    try{const userToken = await authService.signIn(login, password);
        console.log(userToken)
        res.json({
            token: userToken.token
        })} catch(e){
            res.status(400).json({message: e.message});
        }
})

authRouter.post("/sign-up", async (req, res) => {
    const { nome, genero, cargo, email, senha } = req.body;

    try{
        
        const newUser = await authService.signUp(nome, cargo, genero, email, senha);
        res.json({
            created: true
        })
    } catch(e){
        res.json({
            created: false
        })
    }
})

authRouter.get("/is-signed", jwtGuard, async(req,res) => {
    try{const userData = req.user;
        var user = new User();
        var foundUser = await user.findById(userData.id);
        res.json({
            username: foundUser.username,
            image: foundUser.image
        })} catch(e){
            res.status(400).json({message: e.message});
        }
})

authRouter.get("/user/:username", async(req,res) => {
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

export default authRouter;