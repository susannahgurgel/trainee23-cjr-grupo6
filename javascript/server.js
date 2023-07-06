import express from "express";
import authRouter from "./auth/auth.controller.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);

app.listen(4545, () => {
    console.log("o servidor esta funcionando");
})