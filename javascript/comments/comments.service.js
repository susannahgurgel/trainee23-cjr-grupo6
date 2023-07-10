import { PrismaClient } from '@prisma/client'

class Comments {
    user_id;
    content_comments;
    post_id;
    updated_at;
    created_at;

    constructor(user_id, content_comments, post_id){
        this.user_id = user_id;
        this.post_id = post_id;
        this.content_comments = content_comments;
    }

    async addComments(){
        const prisma = new PrismaClient();

        await prisma.Comments.create({
            data: {
                user_id: this.user_id,
                content_comments: this.content_comments,
            }
        })
    }

    async deleteComments(){
        const prisma = new PrismaClient();

        await prisma.Comments.delete({
            where: {
                content_comments: this.content_comments
            }
        })
    }
}

export default Comments