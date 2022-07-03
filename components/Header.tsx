import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "./ActiveLink";

export default function Header() {
  const router = useRouter();
  const lightTheme = router.asPath === "/";

  const headerCss = `relative z-50 container mx-auto flex justify-between h-24 items-center ${
    lightTheme ? "text-white" : "text-black"
  }`;

  return (
    <header className={headerCss}>
      <div className="text-2xl" id="logo">
        <Link href="/">
          <a>good soup studio.</a>
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
