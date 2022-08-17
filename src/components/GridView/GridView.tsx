import GridItem from "components/GridItem/GridItem";
import React, { useMemo } from "react";
import { GistResponseTypes } from "types";
import { Content } from "./GridView.styles";

interface Props {
  gists: GistResponseTypes[];
}

const GridView: React.FC<Props> = ({ gists }) => {
  // Render Function
  const renderGists = useMemo(() => {
    if (Array.isArray(gists)) {
      return gists.map((item, i) => <GridItem key={i} gist={item} />);
    } else {
      return null;
    }
  }, [gists]);

  // Rendering
  return <Content>{renderGists}</Content>;
};

export default GridView;
