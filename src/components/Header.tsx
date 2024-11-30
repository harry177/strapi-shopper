import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./header.scss";

export const Header = () => {
  const [cookies, removeCookie] = useCookies([
    "accessToken",
    "userId",
    "userDocumentId",
    "userName",
  ]);

  useEffect(() => {
    if (
      !cookies.accessToken ||
      !cookies.userId ||
      !cookies.userDocumentId ||
      !cookies.userName
    ) {
      handleLogout();
    }
  }, [cookies]);

  const handleLogout = () => {
    removeCookie("accessToken", "");
    removeCookie("userId", "");
    removeCookie("userDocumentId", "");
    removeCookie("userName", "");
  };

  return (
    <header className="header">
      <Link to={"/"} className="header-logo">
        <Typography.Title>Strapi Shopper</Typography.Title>
      </Link>
      <Link to={"/catalog"}>
        <button>Catalog</button>
      </Link>
      <Flex>
        <Flex vertical>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: cookies.accessToken && "#87d068" }}
          />
          <Typography.Paragraph>{cookies.userName}</Typography.Paragraph>
        </Flex>
        <Flex vertical>
          {cookies.accessToken ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          )}
          <Link to={"/signup"}>
            <button>Sign up</button>
          </Link>
        </Flex>
      </Flex>
    </header>
  );
};
