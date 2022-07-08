import { getPageBySlug } from "../lib/sanity";
import { PageProps } from "../lib/types";
import FormInput from "../components/FormInput";
import React, { ChangeEventHandler, useState, useEffect } from "react";
import {
  sendInquiryProps,
  useSendInquiry,
  inquiryType,
} from "../hooks/useInquiries";
import Head from "next/head";

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

  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = `(function(h,b,s,n,i,p,e,t) {
      h._HB_= {}
      h._HB_ = h._HB_ || {};h._HB_.pid = i;;;;
      t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
      e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
    })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","62c58c07174b5900085b3312");`;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const isLoading = status === "loading";
  const isDone = status === "done";

  const hasDate =
    newInquiry.type &&
    [inquiryType.WEDDING, inquiryType.PORTRAIT, inquiryType.DRONE].includes(
      newInquiry.type
    );

  const hasBrand =
    newInquiry.type && [inquiryType.PRODUCT].includes(newInquiry.type);

  const inquiryTypes = [
    inquiryType.WEDDING,
    inquiryType.PORTRAIT,
    inquiryType.PRODUCT,
    inquiryType.DRONE,
    inquiryType.OTHER,
    inquiryType.GENERAL,
  ];

  const isSelected = (inquiry: inquiryType) => inquiry === newInquiry?.type;

  const handleSetType = (inquiry: inquiryType) => {
    setInquiry({ ...newInquiry, type: inquiry });
  };

  const showHideByType = (type: inquiryType): string =>
    newInquiry.type === type ? "block" : "hidden";

  return (
    <>
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

            <img
              height="1"
              width="1"
              className="hidden"
              src="https://www.honeybook.com/p.png?pid=62c58c07174b5900085b3312"
            />

            <div
              className={`${showHideByType(
                inquiryType.WEDDING
              )} hb-p-62c58c07174b5900085b3312-1`}
            />

            <div
              className={`${showHideByType(
                inquiryType.PORTRAIT
              )} hb-p-62c58c07174b5900085b3312-2`}
            />
          </>
        )}
      </div>
    </>
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
