import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/vte3dhv.css" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
