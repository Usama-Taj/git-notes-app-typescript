import GistErrorBoundaries from "error-boundaries/GistErrorBoundaries";
import React, { ComponentType } from "react";

const withErrorBoundaries = (Component: ComponentType<any>) => {
  return function ComponentWithErrors(props: any) {
    return (
      <GistErrorBoundaries {...props}>
        <Component {...props} />
      </GistErrorBoundaries>
    );
  };
};

export default withErrorBoundaries;
