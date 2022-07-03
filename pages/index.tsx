import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import { PortableText } from "@portabletext/react";
import { getLocaleContent } from "../lib/locale";

type Props = {
  page: PageProps;
};

const Home = (props: Props) => {
  const { page } = props;

  return (
    <div
      className="fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center !bg-cover text-5xl text-white"
      style={{ background: `url(${page.backgroundImage}) no-repeat center` }}
    >
      <PortableText value={getLocaleContent(page.body)} />
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
