import type { PortableTextBlock } from "@portabletext/types";

type LocaleBlockText = {
  en: PortableTextBlock;
  es: PortableTextBlock;
};

export type PageProps = {
  title: string;
  body: LocaleBlockText;
  _id: string;
};

export type ServiceItemProps = {
  name: string;
  slug: string;
  images: [];
  sessionVariants: SessionVariantProps[];
  callToAction: string;
  notes: LocaleBlockText;
  _id: string;
  tags: string[];
};

export type SessionVariantProps = {
  sessionName: string;
  sessionPrice: number;
  _id: string;
  sessionDetails: LocaleBlockText;
};
