import jwt from "jsonwebtoken"
import User from "../user/user.service.js"

const userService = new User("", "", "", "", "");

class AuthService {
    async signIn (userOrEmail, password) {
        var user = await userService.findByEmail(userOrEmail);

        if (!user) {
            var user = await userService.findByUsername(userOrEmail);
        }

        if (!user) throw new Error("Usuário não encontrado");

        if (user.senha !== password) throw new Error("Senha incorreta");

        const token = jwt.sign({id: user.id}, "mudarPAlgoMelhor", {expiresIn: "20m"});
        return {token};
    }

    async signUp (nome, cargo, genero, email, senha) {
        const newUser = new User(nome, senha, genero, cargo, email);
        newUser.addUser();
        return newUser;
    }

}

export default AuthService;