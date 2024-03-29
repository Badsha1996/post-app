import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { title } from "process";
import { SideBar } from "~/components/SideBar";
import LeftBar from "~/components/LeftBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <SessionProvider session={session}>
      <Head>
        <title>Post App</title>
        <meta name="description" content="next js full stack web Badsha Laskar" />
        <link rel="icon" href="" />
      </Head>
      <div className="sm:pr-4 
      container
      mx-auto max-w-full flex 
      bg-gradient-to-r
      text-gray-200
      from-gray-700
      via-gray-900
      to-black">
        <SideBar />
        <div className="
        flex-grow min-h-screen">
          <Component {...pageProps} />
        </div>
        <div className="hidden
        md:block">
          <LeftBar/>
        </div>
      </div>
    </SessionProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
