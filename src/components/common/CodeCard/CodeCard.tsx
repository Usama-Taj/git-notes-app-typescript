import React, { ReactNode } from "react";
import { CodeFileCard } from "./CodeCard.styles";

interface Props {
  title?: string;
  hoverable?: boolean;
  children: ReactNode | React.ReactNode[];
}

const CodeCard: React.FC<Props> = (props) => {
  const { title, children } = props;
  return (
    <CodeFileCard title={title} {...props}>
      {children}
    </CodeFileCard>
  );
};

export default CodeCard;
