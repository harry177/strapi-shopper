import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar, Badge, Flex, Typography } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useGetCartQuery } from "../../features/api/api";
import { updateCart } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import "./header.scss";

export const Header = () => {
  const [cookies, removeCookie] = useCookies([
    "accessToken",
    "userId",
    "userDocumentId",
    "userName",
    "token",
  ]);

  const dispatch = useAppDispatch();

  const { data: user, isSuccess } = useGetCartQuery({
    userId: cookies.userId,
    token: cookies.token,
  });

  useEffect(() => {
    if (isSuccess && user?.cart) {
      dispatch(updateCart(user.cart));
    }
  }, [user]);

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
      <Link to={"/"}>
        <Typography.Title className="header-logo">
          Strapi Shopper
        </Typography.Title>
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
          {cookies.accessToken && user?.cart ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to={"/cart"}>
                <Badge count={user.cart.length} offset={[5, 0]}>
                  <ShoppingCartOutlined style={{ fontSize: "150%" }} />
                </Badge>
              </Link>
            </>
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
