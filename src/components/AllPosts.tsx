import InfiniteScroll from "react-infinite-scroll-component"
import { AllPostQueryProps }  from "~/types/types"
import PostCard from "./PostCard"
import Loading from "./Loading"

const AllPosts = ({ posts, isError, isLoading, newPosts, hasMore }: AllPostQueryProps) => {
    if (isLoading) return <Loading/>
    if (isError) return <h1>Error 404</h1>
    if (posts == null || posts.length === 0) {
        return <div className="p-4 my-4 
        text-center text-xl
      text-gray-300 bg-gray-600">
            There are No Greeting Post Cards this year!!
        </div>
    }
    return <>
        <ul>
            <InfiniteScroll next={newPosts}
                hasMore={hasMore!}
                loader={<Loading/>}
                dataLength={posts.length}>
                    {
                        posts.map(post =>{
                            return <PostCard key={post.id} {...post}/>
                        })
                    }
            </InfiniteScroll>
        </ul>
    </>
}

export default AllPosts