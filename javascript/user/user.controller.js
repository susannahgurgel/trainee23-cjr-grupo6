import { Router } from "express";
import User from "./user.service.js"

const userService = new User();
const userRouter = Router();

userRouter.get("/user/find-by-id/:user_id", async(req,res) => {
    try{const { user_id } = req.params;
        var foundUser = await userService.findById(user_id);
        res.json({
            username: foundUser.username,
            image: foundUser.image
        })} catch(e){
            res.status(400).json({message: e.message});
        }
})

userRouter.post("/user-exists", async(req,res) => {
    const { username } = req.body;
    try{
        const foundUser = await userService.findByUsername(username);
        if (foundUser) {
            return res.json({
                username: foundUser.username,
                foundUser: true
            })
        }
        return res.json({
            username: null,
            foundUser: false
        })
    } catch(e) {
        throw e
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