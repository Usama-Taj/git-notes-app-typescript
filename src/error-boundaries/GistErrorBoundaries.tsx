import { RouterHOCTypes } from "types";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { GridTitle, GridCenter } from "shared-styles/Grid.styles";

interface Props {
  children: ReactNode | ReactNode[];
  router: RouterHOCTypes;
}

interface State {
  hasError: boolean;
}

class GistErrorBoundaries extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.router.params?.username !== this.props.router.params?.username
    );
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("error");
  }
  render() {
    const { children, router } = this.props;
    const { hasError } = this.state;
    if (hasError && typeof router.params?.gist_id === "string") {
      return (
        <GridCenter>
          <GridTitle>404</GridTitle>
          <GridTitle>Ooops! Gist Not Found</GridTitle>
        </GridCenter>
      );
    }
    return children;
  }
}

export default GistErrorBoundaries;
