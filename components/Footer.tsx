import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
export default function Footer(): React.ReactElement {
  const router = useRouter();
  const isHomePage = router.asPath === "/";
  const noBackground = ["/about", "/contact", "/booking"].includes(
    router.asPath
  );
  const currentYear = new Date().getFullYear();

  const footerClasses = ` w-full flex items-center justify-center flex-col py-16 ${
    noBackground ? "text-black" : "bg-[#D3DFDF] text-white"
  }`;

  return !isHomePage ? (
    <footer className={footerClasses}>
      <div className="flex">
        <a href="https://instagram.com" target="_blank">
          <FontAwesomeIcon className="mr-4 w-4" icon={faInstagram} />
        </a>
        <a href="https://facebook.com" target="_blank">
          <FontAwesomeIcon className="w-4" icon={faFacebookSquare} />
        </a>
      </div>

      <p className="mt-6">copyright {currentYear} good soup studio</p>
    </footer>
  ) : (
    <></>
  );
}
