import express from "express";
import User from "./user/user.service.js";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("o servidor esta funcionando")
})

app.post("/sign-up",(req,res) => {
    console.log(req.body)
})