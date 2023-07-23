import {Prisma} from "@prisma/client";
import {inferAsyncReturnType} from "@trpc/server";
import {kStringMaxLength} from "buffer";
import {z} from "zod";
import {createTRPCRouter, publicProcedure, protectedProcedure, createTRPCContext} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
    getUsingId: publicProcedure.input(z.object({id: z.string()})).query(async ({input: {
            id
        }, ctx}) => {
        const curUserId = ctx.session ?. user.id
        const profileData = await ctx.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                image: true,
                _count:{select : {followers:true, follows:true, posts:true}},
                followers: curUserId == null ? undefined : {
                    where: {
                        id: curUserId
                    }
                }
            }
        })

        if(profileData == null){
            return null
        }
        return {
            name:profileData.name,
            image:profileData.image,
            tottalFollowers:profileData._count.followers,
            tottalFollows:profileData._count.follows,
            tottalPosts:profileData._count.posts,
            isFollowing:profileData.followers.length > 0

        }
    })
})
