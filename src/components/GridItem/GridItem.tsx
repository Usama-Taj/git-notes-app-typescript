import React, { useState, useEffect, useCallback } from "react";
import GridFileView from "components/GridFileView/GridFileView";
import { withRouter } from "hoc/withRouter";
import { getTimeCreated, getValidData } from "utilities/utilityFunctions";
import { getGist } from "api/gist.service";
import { Avatar } from "antd";
import { CardContent, GistCard, GistMeta, History } from "./GridItem.styles";
import { GistResponseTypes, RouterHOCTypes } from "types";

interface Props {
  gist?: GistResponseTypes;
  router: RouterHOCTypes;
}

const GridItem: React.FC<Props> = ({ gist, router }) => {
  // Data Variables
  const {
    id,
    owner: { login: username, avatar_url: avatar },
    files,
    created_at,
    description,
  } = gist;
  // States
  const [fileContent, setFileContent] = useState([]);

  // useEffects
  useEffect(() => {
    const { id } = gist;
    getGist(id).then((response) => {
      const { files } = response;
      setFileContent(files[Object.keys(files)[0]].content.split("\n"));
    });
  }, []);
  // Functions
  const handleCardClick = useCallback(() => {
    router.navigate(`/gist-view/${id}`);
  }, [id]);
  // Rendering
  return (
    <GistCard
      onClick={handleCardClick}
      hoverable
      cover={
        <CardContent>
          <GridFileView fileContent={fileContent} />
        </CardContent>
      }
    >
      <GistMeta
        avatar={<Avatar src={avatar} size={40} />}
        title={`${username} / ${getValidData(Object.keys(files)[0])}`}
        description={
          <>
            <History>Created {getTimeCreated(created_at)} Ago</History>
            <History> {getValidData(description)}</History>
          </>
        }
      />
    </GistCard>
  );
};

export default withRouter(GridItem);
