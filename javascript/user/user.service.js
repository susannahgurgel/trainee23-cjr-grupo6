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
        }).catch(e => {
            throw e;
        })
    }

    async changePassword(username, newPassword){
        const prisma = new PrismaClient();
        await prisma.User.update({
            where: {
                username: username
            },
            data: {
                senha: newPassword 
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
        })
    }

    async changeImage(username, image){
        const prisma = new PrismaClient();
        try{
            await prisma.User.update({
                where: {
                    username: username
                },
                data: {
                    image: image 
                }
            }) 
        }catch(e){
            throw e
        }
    }

    async changeUsername(username, newUsername){
        const prisma = new PrismaClient();
        try{
            await prisma.User.update({
                where: {
                    username: username
                },
                data: {
                    username: newUsername 
                }
            })
        }catch(e) {
            throw e;
        }
    }

    async changeCargo(username, newCargo){
        const prisma = new PrismaClient();
        await prisma.User.update({
            where: {
                username: username
            },
            data: {
                cargo: newCargo
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
        })
    }

    async changeEmail(username, newEmail){
        const prisma = new PrismaClient();
        await prisma.User.update({
            where: {
                username: username
            },
            data: {
                email: newEmail
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
        })
    }

    async deleteUser(usernameToDelete){
        const prisma = new PrismaClient();
        await prisma.User.delete({
            where: {
                username: usernameToDelete
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
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

    async findById(userId){
        const prisma = new PrismaClient();
        userId = parseInt(userId);
        return await prisma.User.findUnique({
            where: {
                id: userId
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Usuário não encontrado');
            throw e;
        })
    }
}

export default User