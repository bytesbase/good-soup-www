import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import FormInput from "../components/FormInput";
import { useState } from "react";

type Props = {
  page: PageProps;
};

enum inquiry {
  WEDDING,
  PORTRAIT,
  PRODUCT,
  DRONE,
  FOOD,
  DOCU,
  GENERAL,
}

type InquiryProps = {
  value: string;
  type: inquiry;
};

const Booking = ({ page }: Props) => {
  const { title, subtitle } = page;
  const [selectedType, setType] = useState<InquiryProps>();

  const inquiryTypes = [
    { value: "Wedding", type: inquiry.WEDDING },
    { value: "Portrait", type: inquiry.PORTRAIT },
    { value: "Product", type: inquiry.PRODUCT },
    { value: "Drone services", type: inquiry.DRONE },
    { value: "Food", type: inquiry.FOOD },
    { value: "Documentary", type: inquiry.DOCU },
    { value: "General Question", type: inquiry.GENERAL },
  ];

  const isSelected = (inquiry: InquiryProps) =>
    inquiry.type === selectedType?.type;

  return (
    <div className="pageClass text-center py-12 md:py-16 px-6 md:px-0">
      <h1>{title}</h1>
      <p className="max-w-xl mx-auto">{subtitle}</p>
      <h4 className="my-11">What would you like to inquire for?</h4>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
        {inquiryTypes.map((inquiry) => (
          <button
            onClick={() => setType(inquiry)}
            className={`py-3 px-6 rounded-md ${
              isSelected(inquiry)
                ? "bg-gs-green text-white"
                : "bg-gray-200 text-black"
            }`}
            key={inquiry.type}
          >
            {inquiry.value}
          </button>
        ))}
      </div>

      {selectedType && (
        <form className="flex flex-col items-center mt-11 space-y-4 w-full max-w-4xl mx-auto">
          <h4 className="my-6">Great! Let's get some more information</h4>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
            <FormInput
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Good"
              onChange={() => {}}
            />

            <FormInput
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Soup"
              onChange={() => {}}
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4  w-full">
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="hello@goodsoup.studio"
              onChange={() => {}}
            />

            <FormInput
              name="phone"
              label="Phone"
              type="tel"
              placeholder="(123) 456-7890"
              onChange={() => {}}
            />
          </div>

          <div className="flex space-y-4 items-start flex-col w-full">
            <label htmlFor="Notes">
              Is there anything else you want to note or anything we should be
              aware of?
            </label>
            <textarea name="Notes" id="" className="w-full"></textarea>
          </div>

          <button className="!mt-11 mx-16 bg-gs-green px-3 py-2 rounded-md text-white uppercase">
            Book your session
          </button>
        </form>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const page = await getPageBySlug("booking");

  return {
    props: { page: page[0] },
    revalidate: 1,
  };
}

export default Booking;
