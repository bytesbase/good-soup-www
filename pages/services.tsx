import { getPageBySlug, getServices } from "../lib/sanity";
import { PageProps, ServiceItemProps } from "../lib/types";
import ServiceItem from "../components/services/ServiceItem";

type Props = {
  page: PageProps;
  services: ServiceItemProps[];
};

const Services = (props: Props): React.ReactElement => {
  const { page, services } = props;

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
