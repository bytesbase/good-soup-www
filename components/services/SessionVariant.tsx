import React from "react";

export default function SessionVariant({ variant }): React.ReactElement {
  const { sessionName } = variant;
  return <div>SessionVariant: {sessionName}</div>;
}
