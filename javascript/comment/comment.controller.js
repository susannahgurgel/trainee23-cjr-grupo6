import { Router } from "express";
import Comment from "./comment.service.js"

const commentService = new Comment();
const commentRouter = Router();

commentRouter.post("/comment/create-comment", async (req, res) => {
    const { post_id, user_id, content } = req.body;
   try{
    commentService.addComment(post_id, user_id, content)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

commentRouter.get("/comment/find-comments", async (req, res) => {
   try{
    commentService.findComments()
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

commentRouter.get("/comment/find-by-post-id/:post_id", async (req, res) => {
    try{
    var {post_id} = req.params;
    var comments = await commentService.findByPostId(post_id);
    console.log("oxe")
    console.log(comments)
    res.json({
        comments: comments
    })
   } catch (e) {
       res.status(400).json({message: e.message});
    }
})

commentRouter.get("/find-by-user-id", async (req, res) => {
    const {user_id} = req.body
    try{
    commentService.findByUserId(user_id)
   } catch (e) {
       res.status(400).json({message: e.message});
    }
})

commentRouter.get("/find-by-id", async (req, res) => {
    const {id} = req.body
    try{
    commentService.findById(id)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

commentRouter.patch("/change-comment-content", async (req, res) => {
    const { id, newContent} = req.body;
   try{
    commentService.changeCommentContent(id, newContent)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

commentRouter.delete("/delete-comment", async (req, res) => {
    const { id } = req.body;
   try{
    commentService.deleteComment(id)
   } catch (e) {
    res.status(400).json({message: e.message});
   }
})

export default commentRouter;