import React, { ReactNode } from "react";
import { MainContent } from "./Main.styles";

interface Props {
  children: ReactNode | ReactNode[];
}

const Main: React.FC<Props> = ({ children }) => {
  return <MainContent>{children}</MainContent>;
};

export default Main;
