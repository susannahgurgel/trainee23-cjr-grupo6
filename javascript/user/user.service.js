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
    }

    async addUser(){
        const prisma = new PrismaClient();

        await prisma.User.create({
            data: {
                username: this.username,
                senha: this.senha,
                gender: this.gender,
                email: this.email,
                cargo: this.cargo,
                image: "profile-pic.png"
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

    async findByUsername(userName){
        const prisma = new PrismaClient();

        return await prisma.User.findUnique({
            where: {
                username: userName
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
        })
    }

    async findByEmail(userEmail){
        const prisma = new PrismaClient();
        return await prisma.User.findUnique({
            where: {
                email: userEmail
            },
        }).catch(e => {
        })
    }
}

export default User