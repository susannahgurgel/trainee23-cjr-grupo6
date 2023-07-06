import jwt from "jsonwebtoken"
import User from "./user/user.service.js"

class AuthService {
    async signIn (userOrEmail, password) {
        const user = await User.findByEmail(userOrEmail);

        if (!user) {
            const user = await User.findByUsername(userOrEmail);
        }

        if (!user) throw new Error("Usuário não encontrado");

        if (user.password !== password) throw new Error("Senha incorreta");

        const token = jwt.sign({id: user.id}, "mudarPAlgoMelhor", {expiresIn: "20m"});
        return {token};
    }

    async signUp (nome, cargo, email, senha) {
        const newUser = User(nome, senha, "M", cargo, email);
        newUser.addUser();
        return newUser;
    }
}

export default AuthService;