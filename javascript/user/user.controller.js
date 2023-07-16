import { Router } from "express";
import User from "./user.service.js"

const userService = new User();
const userRouter = Router();

userRouter.post("/user-exists", async(req,res) => {
    const { username } = req.body;
    try{
        const foundUser = await userService.findByUsername(username);
        if (foundUser) {
            res.json({
                username: foundUser.username,
                foundUser: true
            })
        }
    } catch(e){
        try{
            const foundUser = await userService.findByEmail(username);
            if (foundUser){
                res.json({
                    username: foundUser.username,
                    foundUser: true
                })
            }
        } catch(e) {
            res.status(400).json({message: e.message});
        }
    }
})

userRouter.post("/change-password", async (req, res) => {
    const { username, password } = req.body;
   try{
    userService.changePassword(username, password)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

userRouter.post("/change-image", async (req, res) => {
    const { username, image } = req.body;
   try{
    userService.changeImage(username, image)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

userRouter.post("/change-username", async (req, res) => {
    const { username, newUsername } = req.body;
   try{
    userService.changeUsername(username, newUsername)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

userRouter.post("/change-email", async (req, res) => {
    const { username, email } = req.body;
   try{
    userService.changeEmail(username, email)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

userRouter.post("/change-cargo", async (req, res) => {
    const { username, cargo } = req.body;
   try{
    userService.changeCargo(username, cargo)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

export default userRouter;