import { getPageBySlug, getServices } from "../lib/sanity";
import { Page } from "../lib/types";
import ServiceItem from "../components/services/ServiceItem";

type ServiceProps = {
  page: Page;
};

const Services = (props: ServiceProps) => {
  const { page, services } = props;

  console.log({ services });

  return (
    <>
      <div>{page.title}</div>

      {services.map((service) => (
        <ServiceItem service={service} key={service._id} />
      ))}
    </>
  );
};

export async function getStaticProps() {
  const page = await getPageBySlug("services");
  const services = await getServices(false);

  return {
    props: { page: page[0], services },
    revalidate: 1,
  };
}

export default Services;
