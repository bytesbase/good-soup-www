import { getPageBySlug } from "../lib/sanity";
import { Page } from "../lib/types";
import { PortableText } from "@portabletext/react";

type HomepageProps = {
  page: Page;
};

const Home = (props: HomepageProps) => {
  const { page } = props;
  console.log(props);

  const title = page.title;
  console.log(title);

  return (
    <div>
      <PortableText value={page.body.en} />
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
