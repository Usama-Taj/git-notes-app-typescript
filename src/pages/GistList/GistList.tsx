// React
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
// Components
import GistListHeader from "components/GistListHeader/GistListHeader";
import GistListFooter from "components/GistListFooter/GistListFooter";
import TableView from "components/TableView/TableView";
import GridView from "components/GridView/GridView";
import Message from "components/Message/Message";
import { StyledGistList } from "./GistList.styles";
// APIs
import {
  getGistsByUser,
  getPublicGists,
  getPublicStarredGists,
} from "api/gist.service";
// Heigher Order Components
import { withRouter } from "hoc/withRouter";
import { withAuth } from "hoc/withAuth";
// Types
import { RouterHOCTypes } from "types";
// Context Api
import { GistContext } from "context/gists";
// Reducer Actions
import {
  getGistList,
  startGistLoading,
  stopGistLoading,
  setPageNumber,
} from "context/gists/actions";
import Loader from "components/common/Loader/Loader";

interface Props {
  router: RouterHOCTypes;
}
const GistList: React.FC<Props> = ({ router: { params, location } }) => {
  // Data Variables
  const STARTING_PAGE = 1;
  const starred = location.pathname.split("/")[1] === "starred";

  // States
  const [grid_view, setGrid_view] = useState(false);

  // Context Api
  const [state, dispatch] = useContext(GistContext);

  useEffect(() => {
    fetchGists();
  }, [starred, params.username]);

  // Redux Hooks
  const { gist_loading, gists_list } = state;
  // Functions
  const fetchGists = useCallback(async () => {
    let response;
    if (params.username) {
      dispatch(startGistLoading());
      dispatch(setPageNumber(STARTING_PAGE));

      response = await getGistsByUser(params.username, STARTING_PAGE);

      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    } else if (starred) {
      dispatch(setPageNumber(STARTING_PAGE));
      dispatch(startGistLoading());

      response = await getPublicStarredGists(STARTING_PAGE);

      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    } else {
      dispatch(setPageNumber(STARTING_PAGE));
      dispatch(startGistLoading());

      response = await getPublicGists(STARTING_PAGE);

      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    }
  }, [params?.username, starred]);

  const setGridViewType = useCallback(
    (grid_view: boolean) => {
      setGrid_view(grid_view);
    },
    [grid_view]
  );
  const renderGists = useMemo(() => {
    if (gists_list.length > 0) {
      if (grid_view) {
        return <GridView gists={gists_list} />;
      } else {
        return <TableView gists={gists_list} />;
      }
    } else return <Message title="Sorry!" message="Gists not Available" />;
  }, [gists_list, grid_view]);

  return (
    <>
      <StyledGistList>
        <GistListHeader
          setGridViewType={setGridViewType}
          grid_view={grid_view}
        />
        {gist_loading ? (
          <Loader loading={gist_loading} size={70} />
        ) : (
          renderGists
        )}
        {(params?.username || (!params?.username && !starred)) && (
          <GistListFooter />
        )}
      </StyledGistList>
    </>
  );
};

export default withRouter(withAuth(GistList));
