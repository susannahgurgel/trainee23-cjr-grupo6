import express from "express";
import User from "./user/user.js";
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();

app.listen(3000, () => {
    console.log("o servidor esta funcionando")
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const __pdirname = __dirname + "/public/html"

app.use(express.json())

app.get("/",(req,res) => {
    res.sendFile("index.html", { root: __pdirname })
})

app.post("/sign-up",(req,res) => {
    console.log(req.body)
})