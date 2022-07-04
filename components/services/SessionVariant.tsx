import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";
import { listSerializer } from "../../lib/client";
import { getLocaleContent } from "../../lib/locale";
import { SessionVariantProps } from "../../lib/types";

type Props = {
  variant: SessionVariantProps;
};

export default function SessionVariant({ variant }: Props): React.ReactElement {
  const { sessionName, sessionPrice, sessionDetails } = variant;
  return (
    <div>
      <h4 className="font-semibold">
        {sessionName} {sessionPrice ? "- $" + sessionPrice : ""}
      </h4>

      <PortableText
        value={getLocaleContent(sessionDetails)}
        components={listSerializer as PortableTextComponents}
      />
    </div>
  );
}
