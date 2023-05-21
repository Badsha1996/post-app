import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <main className="text-base font-semibold px-2">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, voluptatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse illo tempora voluptatibus, totam maiores amet, dolorum rem dolore cum repudiandae et. Iste aliquam ratione ipsam ut dolores nihil provident eum!</p>
    </main>
  );
};

export default Home;
