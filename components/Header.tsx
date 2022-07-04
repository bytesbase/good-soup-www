import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "./ActiveLink";

export default function Header() {
  const router = useRouter();
  const lightTheme = router.asPath === "/";
  const [isMenuOpen, setMenuOpen] = useState(false);

  const headerCss = `z-50 px-8 container mx-auto flex justify-between h-[80px] items-center ${
    lightTheme
      ? "text-white fixed top-0 left-0 right-0"
      : `${
          isMenuOpen ? "text-white" : "text-black"
        } sticky top-0 bg-white bg-opacity-90`
  }`;

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(!isMenuOpen);
    }
  }, [router.asPath]);

  const handleMobileMenuTriggerClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={headerCss}>
      <div id="logo">
        <Link href="/">
          <a className="text-2xl md:text-3xl"> good soup studio.</a>
        </Link>
      </div>

      <nav className="items-center uppercase md:flex hidden">
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
        <button className="ml-4 bg-gs-green px-3 py-2 rounded-md text-white uppercase">
          Book your session
        </button>
      </nav>

      <div className="md:hidden flex">
        <span
          className={
            isMenuOpen
              ? "open menu-button z-30"
              : `menu-button z-30 ${lightTheme ? "light" : "dark"}`
          }
          onClick={handleMobileMenuTriggerClick}
        />

        {isMenuOpen && (
          <nav className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-90 bg-black">
            <div className="flex flex-col h-full justify-center">
              <ul className="flex flex-col items-center space-y-4 uppercase">
                <li>
                  <ActiveLink activeClassName="text-gs-green" href="/services">
                    <a className="text-xl">Services & Pricing</a>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink activeClassName="text-gs-green" href="/about">
                    <a className="text-xl">About Us</a>
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink activeClassName="text-gs-green" href="/contact">
                    <a className="text-xl">Contact</a>
                  </ActiveLink>
                </li>
              </ul>
              <button className="mt-8 mx-16 bg-gs-green px-3 py-2 rounded-md text-white uppercase">
                Book your session
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
