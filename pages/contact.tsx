import { getPageBySlug } from "../lib/sanity";
import { Page } from "../lib/types";
import { PortableText } from "@portabletext/react";

type ContactProps = {
  page: Page;
};

const Contact = (props: ContactProps) => {
  const { page } = props;

  return (
    <div>
      <PortableText value={page.body.en} />
    </div>
  );
};

export async function getStaticProps() {
  const page = await getPageBySlug("contact");

  return {
    props: { page: page[0] },
    revalidate: 1,
  };
}

export default Contact;
