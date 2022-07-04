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
      <div className="pageClass py-12 md:py-24">
        <h2 className="text-center">{page.title}</h2>
        <p className="text-center">{page.subtitle}</p>

        <ul className="my-12 flex space-x-4 mx-auto">
          {services.map((service) => (
            <li key={service._id}>{service.name}</li>
          ))}
        </ul>

        {services.map((service, index) => (
          <ServiceItem
            service={service}
            key={service._id}
            isLast={index === services.length - 1}
          />
        ))}
      </div>
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
