import jwt from "jsonwebtoken"
import User from "../user/user.service.js"

const userService = new User("", "", "", "", "");

class AuthService {
    async signIn (userOrEmail, password) {
        var user = await userService.findByEmail(userOrEmail);

        if (!user) {
            var user = await userService.findByUsername(userOrEmail);
        }

        if (!user) return null;

        if (user.senha !== password) return null;

        const token = jwt.sign({id: user.id}, "mudarPAlgoMelhor", {expiresIn: "20m"});
        return {token};
    }

    async signUp (nome, cargo, genero, email, senha) {
        try{
            const newUser = new User(nome, senha, genero, cargo, email);
            newUser.addUser();
            return newUser;
        } catch(e) {
            throw new Error("Usuário já existe");
        }
    }

}

export default AuthService;