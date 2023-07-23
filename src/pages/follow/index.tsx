import AllPosts from "~/components/AllPosts"
import TrendCard from "~/components/TrendCard"
import { api } from "~/utils/api"

// only able to see those post whome i am following
const index = () => {
  const posts = api.post.allPosts.useInfiniteQuery(
    {onlyFollowing : true},
    { getNextPageParam: (page) => page.forwardCursor })
  return(
    <>
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
    </>

  )
  
 
}

export default index

