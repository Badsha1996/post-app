import {kStringMaxLength} from "buffer";
import {z} from "zod";
import {createTRPCRouter, publicProcedure, protectedProcedure} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    allPosts: publicProcedure.input(z.object({
        limit: z.number().optional(),
        cursor: z.object(
            {id: z.string(), createdAt: z.date()}
        ).optional()
    })).query(async ({
        input: {
            limit = 10,
            cursor
        },
        ctx
    }) => {
        const userId = ctx.session ?. user.id
        const posts = await ctx.prisma.post.findMany({
            take: limit + 1,
            cursor: cursor ? {
                createdAt_id: cursor
            } : undefined,
            orderBy: [
                {
                    createdAt: 'desc'
                }, {
                    id: 'desc'
                }
            ],
            select: {
                id: true,
                content: true,
                createdAt: true,
                _count: {
                    select: {
                        likes: true
                    }
                },
                likes: userId == null ? false : {
                    where: {
                        userId: userId
                    }
                },
                user: {
                    select: {
                        name: true,
                        id: true,
                        image: true
                    }
                }
            }
        })
        let forwardCursor: typeof cursor | undefined
        if (posts.length > limit) {
            const nextElement = posts.pop()
            if (nextElement != null) {
                forwardCursor = {
                    id: nextElement.id,
                    createdAt: nextElement.createdAt
                }
            }


        }


        return {
            posts: posts.map((post) => {
                return {
                    id: post.id,
                    content: post.content,
                    createdAt: post.createdAt,
                    totalLikes: post._count.likes,
                    likedByUser: post.likes ?. length > 0,
                    user: post.user
                }
            }),
            forwardCursor
        }
    }),
    create: protectedProcedure.input(z.object({content: z.string()})).mutation(async ({input: {
            content
        }, ctx}) => {
        return await ctx.prisma.post.create({
            data: {
                content,
                userId: ctx.session.user.id
            }
        })
    })
});
