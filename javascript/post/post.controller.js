import { Router } from "express";
import Post from "./post.service.js"

const postService = new Post();
const postRouter = Router();

postRouter.post("/create-post", async (req, res) => {
    const { user_id, content } = req.body;
   try{
    postService.addPost(user_id, content)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

postRouter.get("/find-posts", async (req, res) => {
   try{
    postService.findPosts()
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})
postRouter.get("/find-by-user", async (req, res) => {
    const {user_id} = req.body
    try{
    postService.findByUser(user_id)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})
postRouter.get("/find-by-id", async (req, res) => {
    const {id} = req.body
    try{
    postService.findById(id)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

postRouter.patch("/change-post-content", async (req, res) => {
    const { id, newContent} = req.body;
   try{
    postService.changePostContent(id, newContent)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

postRouter.delete("/delete-post", async (req, res) => {
    const { id } = req.body;
   try{
    postService.deletePost(id)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

export default postRouter;