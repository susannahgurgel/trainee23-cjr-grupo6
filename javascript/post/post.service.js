import { PrismaClient } from '@prisma/client'

class Post {
    user_id;
    content;
    updated_at;
    created_at;

    constructor(user_id, content){
        this.user_id = user_id;
        this.content = content;
    }

    async addPost(){
        const prisma = new PrismaClient();

        await prisma.Post.create({
            data: {
                user_id: this.user_id,
                content: this.content,
            }
        })
    }

    async deletePost(){
        const prisma = new PrismaClient();

        await prisma.Post.delete({
            where: {
                content: this.content
            }
        })
    }
}

export default Post