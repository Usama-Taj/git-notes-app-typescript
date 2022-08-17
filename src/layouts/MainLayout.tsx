import React from "react";
import Header from "components/common/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "components/common/main/Main";

type Props = {
  children: React.ReactNode | React.ReactNode[],
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Router>
      <Header />
      <Main>{children}</Main>
    </Router>
  );
};

export default MainLayout;
