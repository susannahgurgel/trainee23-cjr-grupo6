import { Router } from "express";
import User from "./user/user.service.js"
import path from 'path';
import  fs from 'fs';
import {fileURLToPath} from 'url';
import multer from "multer";

const upload = multer({ dest: '../img/' })

const hostRouter = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);
const __dirname2 = path.dirname(__dirname1);
const __dirnameHTML = (path.join(__dirname2, '/html/'));
const __dirnameCSS = (path.join(__dirname2, '/style/'));
const __dirnameIMG = (path.join(__dirname2, '/img/'));
console.log(__dirnameCSS);

hostRouter.get("/perfil/:username", async (req,res) => {
    const {username} = req.params;
    console.log(__dirnameCSS)
    res.sendFile("perfil.html", { root: __dirnameHTML })
})

hostRouter.get("/style/:style", async (req,res) => {
    const {style} = req.params;
    res.sendFile(style, { root: __dirnameCSS })
})

hostRouter.get("/img/:image", async (req, res) => {
    const {image} = req.params;
    res.sendFile(image, { root: __dirnameIMG});
})

hostRouter.get("/", async (req, res) => {
    res.sendFile('feed.html', { root: __dirnameHTML });
})

hostRouter.post("/send-image", upload.single('file'), async (req, res) => {
    if (fs.existsSync('..\\img\\'+req.file.originalname)){
        fs.unlinkSync('..\\img\\'+req.file.originalname)
    }
    fs.renameSync(req.file.path, '..\\img\\'+req.file.originalname)
})



hostRouter.get("/:page", async (req, res) => {
    const {page} = req.params;
    // checa se existe html com esse nome, se existir, evoca ele
    if (fs.existsSync(path.join(__dirnameHTML, page+'.html'))){
        if (page !== "perfil")
            return res.sendFile(page+'.html', { root: __dirnameHTML });
    }
    
    // checa se existe usuário com esse nome, se existir, vai até o perfil dele
    const user = new User();
    const foundUser = await user.findByUsername(page);
    if (foundUser)
        return res.sendFile('perfil.html', { root: __dirnameHTML });
})

export default hostRouter;