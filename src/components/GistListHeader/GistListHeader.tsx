import React, { useCallback } from "react";
import {
  TableGridControls,
  TableGridControlsItem,
  VerticalLine,
} from "./GistListHeader.styles";

interface Props {
  setGridViewType: (arg: boolean) => void;
  grid_view: boolean;
}

const GistListHeader: React.FC<Props> = ({ setGridViewType, grid_view }) => {
  const setGirdView = useCallback(() => {
    setGridViewType(true);
  }, []);

  const setTableView = useCallback(() => {
    setGridViewType(false);
  }, []);

  return (
    <TableGridControls>
      <div></div>
      <TableGridControlsItem>
        <i
          className={`fa-solid fa-list ${!grid_view && "text-success"}`}
          onClick={setTableView}
        ></i>
        <VerticalLine></VerticalLine>
        <i
          className={`fa-solid fa-border-none ${grid_view && "text-success"}`}
          onClick={setGirdView}
        ></i>
      </TableGridControlsItem>
    </TableGridControls>
  );
};

export default GistListHeader;
