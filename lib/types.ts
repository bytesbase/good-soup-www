import type {
  PortableTextBlock,
  PortableTextSpan,
  PortableTextLink,
} from "@portabletext/types";

type LocaleBlockText = {
  en: PortableTextBlock;
  es: PortableTextBlock;
};

export type Page = {
  title: string;
  body: LocaleBlockText;
};
