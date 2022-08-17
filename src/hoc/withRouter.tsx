import React, { ComponentType } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RouterHOCTypes } from "types";

export const withRouter = (Component: ComponentType<any>) => {
  return function ComponentWithRouterProps(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const extendedPropsObject: RouterHOCTypes = { location, navigate, params };

    return <Component {...props} router={extendedPropsObject} />;
  };
};
