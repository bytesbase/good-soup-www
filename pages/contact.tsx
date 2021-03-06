import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import { PortableText } from "@portabletext/react";

type Props = {
  page: PageProps;
};

const Contact = (props: Props) => {
  const { page } = props;

  return (
    <div className="pageClass center text-center">
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
