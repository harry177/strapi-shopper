import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Flex, Typography } from "antd";
import "./user-popover.scss";

export const UserPopover = () => {
  const [cookies, removeCookie] = useCookies([
    "accessToken",
    "userId",
    "userDocumentId",
    "userName",
    "token",
  ]);

  const handleLogout = () => {
    removeCookie("accessToken", "");
    removeCookie("userId", "");
    removeCookie("userDocumentId", "");
    removeCookie("userName", "");
  };

  return (
    <Flex vertical>
      {cookies.accessToken ? (
        <Typography.Paragraph
          onClick={handleLogout}
          className="user-popover__text"
        >
          Logout
        </Typography.Paragraph>
      ) : (
        <Link to={"/login"}>
          <Typography.Paragraph className="user-popover__text">
            Login
          </Typography.Paragraph>
        </Link>
      )}
      <Link to={"/signup"}>
        <Typography.Paragraph className="user-popover__text">
          Signup
        </Typography.Paragraph>
      </Link>
    </Flex>
  );
};
