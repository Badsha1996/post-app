import {Prisma} from "@prisma/client";
import {inferAsyncReturnType} from "@trpc/server";
import {kStringMaxLength} from "buffer";
import {z} from "zod";
import {createTRPCRouter, publicProcedure, protectedProcedure, createTRPCContext} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    allPosts: publicProcedure.input(z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object(
            {id: z.string(), createdAt: z.date()}
        ).optional()
    })).query(async ({
        input: {
            limit = 10,
            onlyFollowing = false,
            cursor
        },
        ctx
    }) => {
        const curUserId  = ctx.session?.user.id
        return await allPosts({
            limit,ctx,cursor,
            whereClause : curUserId == null || !onlyFollowing ? undefined : {
                user : {
                    followers : { some : { id : curUserId}}
                }
            }
        })
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
    }),
    liked: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({input: {
            id
        }, ctx}) => {
        const data = {
            postId: id,
            userId: ctx.session.user.id
        }
        const like = await ctx.prisma.like.findUnique({
            where: {
                userId_postId: data
            }
        })

        if (like == null) {
            await ctx.prisma.like.create({data})
            return {addedLike: true}
        } else {
            await ctx.prisma.like.delete({
                where: {
                    userId_postId: data
                }
            })
            return {addedLike: false}
        }

    })
});


async function allPosts({whereClause, ctx, limit, cursor} : {
    whereClause?: Prisma.PostWhereInput,
    limit : number,
    cursor : {
        id: string,
        createdAt: Date
    } | undefined,
    ctx : inferAsyncReturnType < typeof createTRPCContext >
}) {
    const userId = ctx.session ?. user.id
        const posts = await ctx.prisma.post.findMany({
            take: limit + 1,
            cursor: cursor ? {
                createdAt_id: cursor
            } : undefined,
            where:whereClause,
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
        let forwardCursor: typeof cursor |undefined 
        if(posts.length > limit) {
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
}
