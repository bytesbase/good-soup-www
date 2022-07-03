import React from "react";
import { SessionVariantProps } from "../../lib/types";

type Props = {
  variant: SessionVariantProps;
};

export default function SessionVariant({ variant }: Props): React.ReactElement {
  const { sessionName } = variant;
  return <div>SessionVariant: {sessionName}</div>;
}
