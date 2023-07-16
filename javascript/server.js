import express from "express";
import authRouter from "./auth/auth.controller.js";
import hostRouter from "./hostFiles.js";
import userRouter from "./user/user.controller.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(hostRouter);
app.use(userRouter);

app.listen(4545, () => {
    console.log("o servidor esta funcionando");
})