import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import { PortableText } from "@portabletext/react";
import { getLocaleContent } from "../lib/locale";
import Link from "next/link";

type Props = {
  page: PageProps;
};

const Home = (props: Props) => {
  const { page } = props;

  return (
    <div
      className="min-h-screen min-w-[100vw] flex justify-center items-center !bg-cover text-5xl text-white"
      style={{ background: `url(${page.backgroundImage}) no-repeat center` }}
    >
      <div className="container mx-auto relative z-30 px-6 ">
        <PortableText value={getLocaleContent(page.body)} />

        <Link href="/services">
          <button className="bg-gs-green px-3 py-2 rounded-md text-white uppercase mt-11 block mx-auto md:mx-0">
            View our services
          </button>
        </Link>
      </div>

      {/* <div>Photography // austin </div> */}
      <div className="fixed bg-black bg-opacity-30 left-0 right-0 top-0 bottom-0 z-0" />

      <div
        className="hidden md:flex transform -rotate-90 space-x-4 fixed font-semibold uppercase bottom-[180px] right-[-60px]
      "
      >
        <a href="https://instagram.com" target="_blank">
          Facebook
        </a>
        <span>|</span>
        <a href="https://facebook.com" target="_blank">
          Instagram
        </a>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const page = await getPageBySlug("index");

  return {
    props: { page: page[0] },
    revalidate: 1,
  };
}

export default Home;
