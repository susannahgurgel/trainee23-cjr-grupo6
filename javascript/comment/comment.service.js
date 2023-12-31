import { PrismaClient } from '@prisma/client'

class Comment {
    id;
    post_id;
    user_id;
    content_comments;

    constructor(post_id, user_id, content_comments){
        this.post_id = post_id;
        this.user_id = user_id;
        this.content_comments = content_comments;
    }

    async addComment(post_id){
        const prisma = new PrismaClient();
        await prisma.Comments.create({
            where:{
                post_id: post_id
            },
            data: {
                post_id: this.post_id,
                user_id: this.user_id,
                content_comments: this.content_comments,
            }
        }).catch(e => {
            throw e;
        })
    }

    async findComments(){
        const prisma = new PrismaClient();
        await prisma.Comments.findMany().catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum comentário encontrado');
            throw e;
        })
    }

    async findByPostId(post_id){
        const prisma = new PrismaClient();
        var id_int = parseInt(post_id);
        console.log(id_int)
        return await prisma.Comments.findMany({
            where: {
                post_id: id_int
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum comentário encontrado');
            throw e;
        })
    }

    async findByUserId(user_id){
        const prisma = new PrismaClient();
        return await prisma.Comment.findMany({
            where: {
                user_id: user_id
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum comentário encontrado');
            throw e;
        })
    }

    async findById(id){
        const prisma = new PrismaClient();
        return await prisma.Comments.findUnique({
            where: {
                id: id
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Comentário não encontrado');
            throw e;
        })
    }
    async changeCommentContent(id, newContent){
        const prisma = new PrismaClient();
        await prisma.Comments.update({
            where: {
                id: id
            },
            data: {
                content: newContent 
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Comentário não encontrado');
            throw e;
        })
    }

    async deleteComment(id){
        const prisma = new PrismaClient();
        await prisma.Comments.delete({
            where: {
                id: id
            }
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Comentário não encontrado');
            throw e;
        })
    }
}



export default Comment