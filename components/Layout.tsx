import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/vte3dhv.css" />
      </Head>
      <Header />
      <main className="grow flex">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
