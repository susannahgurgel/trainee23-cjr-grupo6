import { Router } from "express";
import Post from "./post.service.js"
import User from "../user/user.service.js"

const postService = new Post();
const postRouter = Router();

postRouter.post("/post/create-post", async (req, res) => {
    const { user_id, content } = req.body;
   try{
    postService.addPost(user_id, content)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

postRouter.get("/post/find-posts", async (req, res) => {
   try{
      var posts = await postService.findPosts()
      res.json({
         posts: posts
      })
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})
postRouter.get("/find-by-user/:username", async (req, res) => {
    try{
      const {username} = req.params;
      var user = new User();
      var foundUser = await user.findByUsername(username);
      var posts = await postService.findByUser(foundUser.id);
      res.json({
         posts: posts
      })
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