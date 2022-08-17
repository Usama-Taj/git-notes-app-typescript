import React, { ComponentType, useContext } from "react";
import Message from "components/Message/Message";
import { GistContext } from "context/gists";
import NotAuthorized from "pages/NotAuthorized/NotAuthorized";

const PUBLIC_PATHS = ["", "gist-view", "search", "login"];

export function withAuth(Component: ComponentType<any>) {
  return function ComponentWithReduxState(props: any) {
    const {
      router: { location },
    } = props;
    const [state] = useContext(GistContext);
    const { logged_in } = state;
    if (!logged_in && !PUBLIC_PATHS.includes(location.pathname.split("/")[1])) {
      return <NotAuthorized />;
    } else if (logged_in && location.pathname === "/login") {
      return (
        <Message title="Oops!" message="seems like you are already logged in" />
      );
    } else {
      return <Component {...props} />;
    }
  };
}
