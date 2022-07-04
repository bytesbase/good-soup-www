import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import FormInput from "../components/FormInput";
import React, { ChangeEventHandler, useState } from "react";
import {
  sendInquiryProps,
  useSendInquiry,
  inquiryType,
} from "../hooks/useInquiries";

type Props = {
  page: PageProps;
};

const Booking = ({ page }: Props) => {
  const { mutateAsync } = useSendInquiry();
  const { title, subtitle } = page;
  const [status, setStatus] = useState<string>("unsubmitted");
  const [newInquiry, setInquiry] = useState<sendInquiryProps>({
    type: null,
    shootDate: "",
    phone: "",
    lastName: "",
    internalNotes: "",
    firstName: "",
    email: "",
  });

  const isLoading = status === "loading";
  const isDone = status === "done";

  const hasDate =
    newInquiry.type &&
    [inquiryType.WEDDING, inquiryType.PORTRAIT, inquiryType.DRONE].includes(
      newInquiry.type
    );

  const hasBrand =
    newInquiry.type &&
    [inquiryType.PRODUCT, inquiryType.FOOD].includes(newInquiry.type);

  const inquiryTypes = [
    inquiryType.WEDDING,
    inquiryType.PORTRAIT,
    inquiryType.PRODUCT,
    inquiryType.DRONE,
    inquiryType.FOOD,
    inquiryType.DOCU,
    inquiryType.GENERAL,
  ];

  const isSelected = (inquiry: inquiryType) => inquiry === newInquiry?.type;

  const handleSetType = (inquiry: inquiryType) => {
    setInquiry({ ...newInquiry, type: inquiry });
  };

  const updateInquiryField = (
    field: string,
    event: React.BaseSyntheticEvent
  ) => {
    const value = event.target.value;
    setInquiry({ ...newInquiry, [field]: value });
  };

  const sendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    console.log({ newInquiry });

    mutateAsync(newInquiry).then(
      (res) => setStatus("done"),
      (err) => setStatus("error")
    );
  };

  return (
    <div className="pageClass text-center py-12 md:py-16 px-6 md:px-0">
      {isDone && (
        <h1 className="my-auto">
          Thanks for submitting your inquiry, {newInquiry.firstName}! 🚀
          <br /> We'll be in contact soon.
        </h1>
      )}

      {!isDone && (
        <>
          <h1>{title}</h1>
          <p className="max-w-xl mx-auto">{subtitle}</p>
          <h4 className="my-11">What would you like to inquire for?</h4>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            {inquiryTypes.map((inquiry) => (
              <button
                onClick={() => handleSetType(inquiry)}
                className={`py-3 px-6 rounded-md ${
                  isSelected(inquiry)
                    ? "bg-gs-green text-white"
                    : "bg-gray-200 text-black"
                }`}
                key={inquiry}
              >
                {inquiry}
              </button>
            ))}
          </div>

          {newInquiry.type && (
            <form
              onSubmit={sendInquiry}
              className="flex flex-col items-center mt-11 space-y-4 w-full max-w-4xl mx-auto"
            >
              <h4 className="my-6">Great! Let's get some more information</h4>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
                <FormInput
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Good"
                  required={true}
                  onChange={(value) => updateInquiryField("firstName", value)}
                />

                <FormInput
                  name="lastName"
                  label="Last Name"
                  type="text"
                  required={true}
                  placeholder="Soup"
                  onChange={(value) => updateInquiryField("lastName", value)}
                />
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4  w-full">
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  required={true}
                  placeholder="hello@goodsoup.studio"
                  onChange={(value) => updateInquiryField("email", value)}
                />

                <FormInput
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  required={true}
                  onChange={(value) => updateInquiryField("phone", value)}
                />
              </div>

              {hasBrand && (
                <div className="flex space-y-4 items-start flex-col w-full">
                  <FormInput
                    name="brand"
                    label=" What is the brand name"
                    type="text"
                    placeholder="good soup"
                    required={true}
                    onChange={(value) => updateInquiryField("shootDate", value)}
                  />
                </div>
              )}

              {hasDate && (
                <div className="flex space-y-4 items-start flex-col w-full">
                  <FormInput
                    name="date"
                    label=" Do you have a date in mind?"
                    type="date"
                    placeholder="(123) 456-7890"
                    required={false}
                    onChange={(value) => updateInquiryField("shootDate", value)}
                  />
                </div>
              )}

              {newInquiry.type === inquiryType.WEDDING && (
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4  w-full">
                  <FormInput
                    name="location"
                    label="Where is the wedding located?"
                    type="text"
                    required={true}
                    placeholder="Austin, TX"
                    onChange={(value) => updateInquiryField("location", value)}
                  />

                  <FormInput
                    name="attendees"
                    label="How big will the wedding be approx?"
                    type="text"
                    placeholder="200"
                    required={true}
                    onChange={(value) =>
                      updateInquiryField("weddingSize", value)
                    }
                  />
                </div>
              )}

              <div className="flex space-y-4 items-start flex-col w-full">
                <label htmlFor="Notes">
                  {newInquiry.type === inquiryType.GENERAL
                    ? "What can we answer for you?"
                    : "Is there anything you want to note or that we should be aware of?"}
                </label>
                <textarea
                  required={newInquiry.type === inquiryType.GENERAL}
                  name="Notes"
                  id=""
                  className="w-full h-48"
                  placeholder="we love good soup."
                ></textarea>
              </div>

              <button className="!mt-11 mx-16 bg-gs-green px-3 py-2 rounded-md text-white uppercase">
                Submit your inquiry
                {isLoading && "loading"}
              </button>
            </form>
          )}
        </>
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
