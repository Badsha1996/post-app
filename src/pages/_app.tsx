import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { title } from "process";
import { SideBar } from "~/components/SideBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Post App</title>
        <meta name="description" content="next js full stack web Badsha Laskar" />
        <link rel="icon" href="" />
      </Head>
      <div className="sm:pr-4 container text-gray-200
       mx-auto max-w-full flex 
       bg-gradient-to-r
       from-gray-700
       via-gray-900
       to-black">
        <SideBar />
        <div className="
        flex-grow min-h-screen">
          <Component {...pageProps} />
        </div>
        <div className="hidden md:min-w-[20%] md:block">
          space
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
