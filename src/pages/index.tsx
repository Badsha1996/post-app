import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import NewPost from "~/components/NewPost";
import ProfilePicture from "~/components/ProfilePicture";
import AllPosts from "~/components/AllPosts";

const LatestPosts = () =>{
  const posts = api.post.allPosts.useInfiniteQuery({},
    {getNextPageParam : (page) => page.forwardCursor})
  return <AllPosts 
  posts={posts.data?.pages.flatMap(page => page.posts)}
  isError = {posts.isError}
  isLoading = {posts.isLoading}
  hasMore = {posts.hasNextPage}
  newPosts = {posts.fetchNextPage}/>
}
const Home: NextPage = () => {
  const session = useSession()
  const user = session.data?.user

  return (
    <>
      <header className="sticky
      top-0
      z-10
      pt-2
      flex
      ">
        <h1 className="px-4 font-bold
        mb-2 
        text-lg flex-1">
          Post App
        </h1>
        {
          user != null && (
            <ProfilePicture src={user.image} className="h-9 w-9 mr-4" />
          )
        }
      </header>
      {session.status == 'authenticated' && (
        <main>
          <NewPost />
          <LatestPosts />
        </main>
      )}
      {session.status != 'authenticated' && (
        <main>
          <h1>You have to login to post anything!!!</h1>
        </main>
      )}
    </>
  );
};

export default Home;
