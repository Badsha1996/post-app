import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import NewPost from "~/components/NewPost";

const Home: NextPage = () => {
  const session = useSession()
  const user = session.data?.user
  return (
    <>
      <header className="sticky
      top-0
      z-10
      border-b
      border-gray-400
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
            <img src={user?.image!} alt="profile image" className="
        h-8 w-8 rounded-full mr-1"/>
          )
        }
      </header>
      <main>
        <NewPost/>
      </main>
    </>
  );
};

export default Home;
