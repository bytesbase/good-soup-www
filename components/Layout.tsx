import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between min-h-screen">
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/vte3dhv.css" />
        </Head>
        <Header />
        <main className="grow flex">{children}</main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default Layout;
