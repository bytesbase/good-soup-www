import { LocaleObject } from "./types";
import type { PortableTextBlock } from "@portabletext/types";

export const getLocaleContent = (object: LocaleObject): PortableTextBlock => {
  return object && object.en;
};
