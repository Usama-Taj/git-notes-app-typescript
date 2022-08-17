import React from "react";
import Message from "components/Message/Message";
import { GridCenter } from "shared-styles/Grid.styles";

const NotFound: React.FC = () => {
  return (
    <GridCenter>
      <Message title="404" />
      <Message message="Resource Not Found" />
    </GridCenter>
  );
};

export default NotFound;
