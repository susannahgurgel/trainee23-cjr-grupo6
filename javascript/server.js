import express from "express";
import User from "./user/user.js";

const app = express();

app.use.(express.static('html'))

app.get('/sign-up', (req, res) => {
    res.sendFile()
})

app.post('/sign-up-data', (req) => {

})

app.listen(3000, () => {
    console.log("o servidor esta funcionando")
})