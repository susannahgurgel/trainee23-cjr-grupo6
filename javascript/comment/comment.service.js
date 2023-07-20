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
        await prisma.Comment.create({
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
        await prisma.Comment.findMany({
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum comentário encontrado');
            throw e;
        })
    }

    async findByPostId(post_id){
        const prisma = new PrismaClient();
        return await prisma.Comment.findMany({
            where: {
                post_id: post_id
            },
        }).catch(e => {
            if (e.code == 'P2025') throw new Error('Nenhum comentário encontrado');
            throw e;
        })
    }

    async findById(id){
        const prisma = new PrismaClient();
        return await prisma.Comment.findUnique({
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
        await prisma.Comment.update({
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



export default Comment