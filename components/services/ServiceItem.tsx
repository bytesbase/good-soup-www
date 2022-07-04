import { PortableText } from "@portabletext/react";
import React from "react";
import { urlFor } from "../../lib/client";
import { getLocaleContent } from "../../lib/locale";
import { ServiceItemProps } from "../../lib/types";
import SessionVariant from "./SessionVariant";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

type Props = {
  service: ServiceItemProps;
  isLast: boolean;
};

export default function ServiceItem({ service, isLast }: Props) {
  const { name, sessionVariants, images, callToAction, notes } = service;

  return (
    <div>
      <h3 className="text-center mb-12">{name}</h3>

      <Carousel
        centerSlidePercentage={44}
        infiniteLoop
        centerMode
        showThumbs={false}
        autoPlay
        showStatus={false}
        interval={10000}
        showIndicators={false}
        swipeable={false}
      >
        {images.map((image) => (
          <div key={image}>
            <img
              className="object-cover h-[25vh] md:h-[60vh] max-h-[800px] w-96"
              src={urlFor(image).width(1000).url()}
              alt=""
            />
          </div>
        ))}
      </Carousel>

      <div className="px-9">
        <div className="grid md:grid-cols-2 gap-8 my-8">
          {sessionVariants.map((variant) => (
            <SessionVariant variant={variant} key={variant.sessionName} />
          ))}
        </div>

        <h4 className="underline">Additional Notes</h4>
        <PortableText value={getLocaleContent(notes)} />

        <button className="bg-gs-green px-3 py-2 rounded-md text-white mt-8 mx-auto block">
          {callToAction}
        </button>
      </div>

      {!isLast && <div className="w-12 my-14 h-1 bg-[#D3DFDF] block mx-auto" />}
    </div>
  );
}
