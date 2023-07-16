import jwt from "jsonwebtoken"
export default function (req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res.status(401).json({message: "Token não informado"});
    const [prefix, token] = authorization.split(" ");

    if (prefix !== "Bearer"){
        return res.status(401).json({message: "Token mal formatado"});
    }
    try{
        const decoded = jwt.verify(token, "mudarPAlgoMelhor");
        req.user = decoded;
        next()
    } catch (e) {
        res.status(401).json({message: e.message});
    }
}