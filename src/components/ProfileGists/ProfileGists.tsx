import React, { useMemo } from "react";
import { GistResponseTypes } from "types";
import ProfileGistItem from "components/ProfileGistItem/ProfileGistItem";
import { ProfileGistList } from "./ProfileGists.styles";

interface Props {
  gists: GistResponseTypes[];
}
const ProfileGists: React.FC<Props> = ({ gists }) => {
  const renderGists = useMemo(() => {
    return gists.map((gist, i) => <ProfileGistItem key={i} gist={gist} />);
  }, [gists]);

  return <ProfileGistList>{renderGists}</ProfileGistList>;
};

export default ProfileGists;
