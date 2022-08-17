import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useState,
} from "react";
import logo from "assets/logos/logo.svg";
import avatar from "assets/images/img_avatar.png";
import {
  HeaderArea,
  NavBar,
  NavBarLogo,
  NavBarControls,
  UserImage,
  SearchBar,
} from "./Header.styles";
import { withRouter } from "hoc/withRouter";
import { RouterHOCTypes } from "types";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import Button from "../Button/Button";
import { GistContext } from "context/gists";
import { setLoggedInState } from "context/gists/actions";
import { ItemType } from "antd/lib/menu/hooks/useItems";

interface HeaderProps extends RouterHOCTypes {
  router: RouterHOCTypes;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { router } = props;
  // Data Variables
  const GITHUB_PROFILE = `https://github.com/${process.env.USERNAME}`;
  // States
  const [username, setUsername] = useState("");

  // Redux Hooks
  const [state, dispatch] = useContext(GistContext);
  const { logged_in } = state;

  // Functions
  const logoutUser = useCallback(() => {
    localStorage.setItem("gist_app", JSON.stringify({ logged_in: false }));
    dispatch(setLoggedInState(false));
    router.navigate("/login");
  }, []);

  const handleLoginUser = useCallback(() => {
    router.navigate("/login");
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        router.navigate(`/search/${username}`);
      }
    },
    [username]
  );

  // Dropdown Menu Items
  const menuItems: ItemType[] = [
    { label: <Link to={`/starred`}>Starred Gists</Link>, key: "1" },
    {
      label: <Link to={`/profile/${process.env.USERNAME}`}>Your Gists</Link>,
      key: "2",
    },
    { label: <Link to={`/`}>Public Gist</Link>, key: "5" },
    { label: <Link to={`/add-gist`}>Add Gist</Link>, key: "3" },
    {
      label: (
        <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer">
          Your Github profile
        </a>
      ),
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: (
        <span onClick={logoutUser}>
          <b>Log Out</b>
        </span>
      ),
      key: "6",
    },
  ];
  // Export
  return (
    <>
      <HeaderArea>
        <NavBar>
          <Link to={"/"}>
            <NavBarLogo src={logo} alt="Emumba Logo" />
          </Link>

          <NavBarControls>
            <SearchBar
              suffix={<SearchOutlined />}
              type="text"
              name="search"
              id="search"
              placeholder="Search Name..."
              onChange={handleSearchChange}
              onKeyUp={handleEnter}
              autoComplete="off"
            />

            {!logged_in ? (
              <Button onClick={handleLoginUser} width={"20"}>
                Login
              </Button>
            ) : (
              <Dropdown
                overlay={<Menu items={menuItems} />}
                placement="bottomRight"
                arrow
              >
                <UserImage src={avatar} alt="UserImage" />
              </Dropdown>
            )}
          </NavBarControls>
        </NavBar>
      </HeaderArea>
      <div className="under-header"></div>
    </>
  );
};
export default withRouter(Header);
