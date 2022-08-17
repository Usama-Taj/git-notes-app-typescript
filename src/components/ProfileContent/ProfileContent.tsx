import React from "react";
import { ProfileInfo, ViewProfileButton } from "./ProfileContent.styles";
import { Avatar } from "antd";

interface Props {
  profile: { avatar_url: string; login: string; html_url: string };
}

const ProfileContent: React.FC<Props> = ({
  profile: { avatar_url, login, html_url },
}) => {
  return (
    <div>
      <ProfileInfo>
        <div>
          <Avatar src={avatar_url} alt="user" size={300} />
        </div>
        <div>{login}</div>
        <div>
          <a
            style={{ textDecoration: "none" }}
            href={html_url}
            target="_blank"
            rel="noreferrer"
          >
            <ViewProfileButton>View GitHub Profile</ViewProfileButton>
          </a>
        </div>
      </ProfileInfo>
    </div>
  );
};

export default ProfileContent;
