import type { PortableTextBlock } from "@portabletext/types";

export type LocaleObject = {
  en: PortableTextBlock;
  es: PortableTextBlock;
};

type SanityAsset = {
  asset: {
    url: string;
  };
};

export type PageProps = {
  backgroundImage: string;
  subtitle?: string;
  title: string;
  body: LocaleObject;
  _id: string;
};

export type ServiceItemProps = {
  name: string;
  slug: string;
  images: [];
  sessionVariants: SessionVariantProps[];
  callToAction: string;
  notes: LocaleObject;
  _id: string;
  tags: string[];
};

export type SessionVariantProps = {
  sessionName: string;
  sessionPrice: number;
  _id: string;
  sessionDetails: LocaleObject;
};
