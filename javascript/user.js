import { PrismaClient } from '@prisma/client'

class User {
    username;
    senha;
    gender;
    email;
    cargo;
    admin;
    created_at;

    constructor(username, senha, gender, cargo, email){
        this.username = username;
        this.senha = senha;
        this.gender = gender;
        this.email = email;
        this.cargo = cargo;
        this.admin = false;
        this.created_at = new Date();
    }

    async addUser(){
        const prisma = new PrismaClient();

        await prisma.User.create({
            data: {
                id: "" + (Math.floor(Math.random() * 10000000) + 1),
                username: this.username,
                senha: this.senha,
                gender: this.gender,
                email: this.email,
                cargo: this.cargo,
                admin: this.admin,
                created_at: this.created_at
            }
        })
    }

    async deleteUser(){
        const prisma = new PrismaClient();

        await prisma.User.delete({
            where: {
                username: this.username
            }
        })
    }
}

export default User