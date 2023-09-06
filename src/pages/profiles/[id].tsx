import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from 'next/error'
import AllPosts from "~/components/AllPosts";
import { useSession } from "next-auth/react";

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ id }) => {
    const { data: profile } = api.profile.getUsingId.useQuery({ id })
    const session = useSession()
    const posts = api.post.allUserPosts.useInfiniteQuery(
        { userId: id },
        { getNextPageParam: (lastPage) => lastPage.forwardCursor }
    )
    if (profile == null || profile.name == null) return <ErrorPage statusCode={404} />
    return (
        <>

            {session.status == 'authenticated' && (
                <main>
                    {profile.name}
                    <AllPosts
                        posts={posts.data?.pages.flatMap(page => page.posts)}
                        isError={posts.isError}
                        isLoading={posts.isLoading}
                        hasMore={posts.hasNextPage}
                        newPosts={posts.fetchNextPage} />
                </main>
            )}
            {session.status != 'authenticated' && (
                <main>
                    <h1>You have to login to post anything!!!</h1>
                </main>
            )}


        </>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
    const id = context.params?.id
    if (id == null) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }

    const ssg = ssgHelper()
    await ssg.profile.getUsingId.prefetch({ id })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id
        }
    }
}

export default ProfilePage