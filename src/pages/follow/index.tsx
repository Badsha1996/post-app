import { useSession } from "next-auth/react"
import AllPosts from "~/components/AllPosts"
import TrendCard from "~/components/TrendCard"
import { api } from "~/utils/api"

// only able to see those post whome i am following
const index = () => {
  const session = useSession()
  const posts = api.post.allPosts.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (page) => page.forwardCursor })
  return (

    <>
      {session.status == 'authenticated' && (
        <main>
          <TrendCard
            posts={posts.data?.pages.flatMap(page => page.posts)}
            isError={posts.isError}
            isLoading={posts.isLoading}
            hasMore={posts.hasNextPage}
            newPosts={posts.fetchNextPage}
          />
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

export default index

