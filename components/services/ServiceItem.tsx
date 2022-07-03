import React from "react";
import { ServiceItemProps } from "../../lib/types";
import SessionVariant from "./SessionVariant";

type Props = {
  service: ServiceItemProps;
};

export default function ServiceItem({ service }: Props) {
  const { name, sessionVariants } = service;
  return (
    <div>
      {name}

      {sessionVariants.map((variant) => (
        <SessionVariant variant={variant} key={variant.sessionName} />
      ))}
    </div>
  );
}
