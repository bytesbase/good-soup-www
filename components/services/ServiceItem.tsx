import React from "react";
import SessionVariant from "./SessionVariant";

export default function ServiceItem({ service }) {
  const { name, sessionVariants } = service;
  return (
    <div>
      {name}

      {sessionVariants.map((variant) => (
        <SessionVariant variant={variant} />
      ))}
    </div>
  );
}
