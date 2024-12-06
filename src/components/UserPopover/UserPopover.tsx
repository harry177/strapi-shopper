import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Flex, Typography } from "antd";

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
        <Typography.Paragraph onClick={handleLogout}>
          Logout
        </Typography.Paragraph>
      ) : (
        <Link to={"/login"}>
          <Typography.Paragraph>Login</Typography.Paragraph>
        </Link>
      )}
      <Link to={"/signup"}>
        <Typography.Paragraph>Signup</Typography.Paragraph>
      </Link>
    </Flex>
  );
};
