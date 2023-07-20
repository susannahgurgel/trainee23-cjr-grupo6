import { PrismaClient } from '@prisma/client'

class Post {
    id;
    user_id;
    content;
    updated_at;
    created_at;

    constructor(user_id, content, created_at){
        this.user_id = user_id;
        this.content = content;
        this.created_at = created_at;
    }

    async addPost(){
        const prisma = new PrismaClient();
        await prisma.Post.create({
            data: {
                user_id: this.user_id,
                content: this.content,
                created_at: this.created_at,
            }
        }).catch(e => {
            throw e;
        })
    }

    async findPosts(){
        const prisma = new PrismaClient();
        await prisma.Post.findMany({
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum post encontrado');
            throw e;
        })
    }

    async findByUser(user_id){
        const prisma = new PrismaClient();
        return await prisma.Post.findMany({
            where: {
                user_id: user_id
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Post não encontrado');
            throw e;
        })
    }

    async findById(id){
        const prisma = new PrismaClient();
        return await prisma.Post.findUnique({
            where: {
                id: id
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Post não encontrado');
            throw e;
        })
    }
    async changePostContent(id, newContent){
        const prisma = new PrismaClient();
        await prisma.Post.update({
            where: {
                id: id
            },
            data: {
                content: newContent 
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Post não encontrado');
            throw e;
        })
    }

    async deletePost(id){
        const prisma = new PrismaClient();
        await prisma.Post.delete({
            where: {
                id: id
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Post não encontrado');
            throw e;
        })
    }
}



export default Post