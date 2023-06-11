import InfiniteScroll from "react-infinite-scroll-component"

type AllPostQueryProps = {
    isLoading: boolean,
    isError: boolean,
    hasMore: boolean | undefined,
    newPosts: () => Promise<any>
    posts: Post[] | undefined
}

type Post = {
    id: string,
    content: string,
    createdAt: Date,
    totalLikes: number,
    likedByUser: boolean,
    user: {
        image: string | null;
        id: string;
        name: string | null;
    }
}
const AllPosts = ({ posts, isError, isLoading, newPosts, hasMore }: AllPostQueryProps) => {
    if (isLoading) return <h1>Loading.....</h1>
    if (isError) return <h1>Error 404</h1>
    if (posts == null || posts.length === 0) {
        return <div className="p-4 my-4 text-center text-xl text-gray-300 bg-gray-600">
            There are No Greeting Post Cards this year!!
        </div>
    }
    return <>
        <ul>
            <InfiniteScroll next={newPosts}
                hasMore={hasMore!}
                loader={'Please wait...'}
                dataLength={posts.length}>
                    {
                        posts.map(post =>{
                            return <div key={post.id}>
                                {post.user.name}
                                {post.content} 
                            </div>
                        })
                    }
            </InfiniteScroll>

        </ul>
    </>

}

export default AllPosts