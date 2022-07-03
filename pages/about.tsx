import { getPageBySlug } from "../lib/sanity";
import { Page } from "../lib/types";
import { PortableText } from "@portabletext/react";

type AboutProps = {
  page: Page;
};

const About = (props: AboutProps) => {
  const { page } = props;

  return (
    <div>
      <PortableText value={page.body.en} />
    </div>
  );
};

export async function getStaticProps() {
  const page = await getPageBySlug("about");

  return {
    props: { page: page[0] },
    revalidate: 1,
  };
}

export default About;
