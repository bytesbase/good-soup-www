import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "./ActiveLink";

export default function Header() {
  const router = useRouter();
  const lightTheme = router.asPath === "/";

  const headerCss = `relative z-50 container mx-auto flex justify-between h-[80px] items-center ${
    lightTheme ? "text-white" : "text-black sticky top-0 bg-white bg-opacity-90"
  }`;

  return (
    <header className={headerCss}>
      <div id="logo">
        <Link href="/">
          <a className="text-3xl"> good soup studio.</a>
        </Link>
      </div>

      <nav className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <ActiveLink activeClassName="text-gs-green" href="/services">
              <a>Services & Pricing</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="text-gs-green" href="/about">
              <a>About Us</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="text-gs-green" href="/contact">
              <a>Contact</a>
            </ActiveLink>
          </li>
        </ul>
        <button className="ml-4 bg-gs-green px-3 py-2 rounded-md text-white">
          Book your session
        </button>
      </nav>
    </header>
  );
}
