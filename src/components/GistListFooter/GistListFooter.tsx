import { getGistsByUser, getPublicGists } from "api/gist.service";
import {
  getGistList,
  setPageNumber,
  startGistLoading,
  stopGistLoading,
} from "context/gists/actions";
import { GistContext } from "context/gists";
import React, { useCallback, useContext } from "react";
import {
  PaginationControls,
  PageInfo,
  PreviousButton,
  NextButton,
} from "./GistListFooter.styles";
import { withRouter } from "hoc/withRouter";
import { RouterHOCTypes } from "types";

interface Props {
  router: RouterHOCTypes;
}

const GistListFooter: React.FC<Props> = ({ router: { params } }) => {
  // Context API
  const [state, dispatch] = useContext(GistContext);
  const { page_number, gists_list } = state;

  // Functions
  const moveBack = useCallback(async () => {
    dispatch(startGistLoading());
    dispatch(setPageNumber(page_number - 1));
    const response = params.username
      ? await getGistsByUser(params.username, page_number - 1)
      : await getPublicGists(page_number - 1);
    dispatch(getGistList(response));
    dispatch(stopGistLoading());
  }, [page_number]);

  const moveNext = useCallback(async () => {
    dispatch(startGistLoading());
    dispatch(setPageNumber(page_number + 1));
    const response = params.username
      ? await getGistsByUser(params.username, page_number + 1)
      : await getPublicGists(page_number - 1);
    dispatch(getGistList(response));
    dispatch(stopGistLoading());
  }, [page_number]);

  // Rendering
  return (
    <PaginationControls>
      <div></div>
      <div>
        <PreviousButton disabled={page_number === 1} onClick={moveBack}>
          Prev
        </PreviousButton>
        <NextButton
          disabled={page_number === 30 || gists_list.length < 10}
          onClick={moveNext}
        >
          Next
        </NextButton>
      </div>
      <PageInfo>Page {page_number} of 30</PageInfo>
    </PaginationControls>
  );
};

export default withRouter(GistListFooter);
