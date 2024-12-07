import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Avatar, Badge, Flex, Menu, Popover, Typography } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGetCartQuery } from "../../features/api/api";
import { updateCart } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import "./header.scss";
import { UserPopover } from "../UserPopover/UserPopover";

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

  const location = useLocation();

  useEffect(() => {
    if (isSuccess && user?.cart) {
      dispatch(updateCart(user.cart));
      console.log(user.cart);
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
      <Flex align="center" gap={100}>
        <Link to={"/"}>
          <Typography.Title className="header-logo">
            Strapi Shopper
          </Typography.Title>
        </Link>
        <Menu selectedKeys={[location.pathname]} className="header-menu">
          <Menu.Item key="/catalog">
            <Link to="/catalog">Catalog</Link>
          </Menu.Item>
        </Menu>
      </Flex>
      <Flex
        align="center"
        justify="space-evenly"
        gap="small"
        className="header__icons-container"
      >
        <Typography.Paragraph>{cookies.userName}</Typography.Paragraph>
        <Flex justify="center" style={{width: '140px'}}>
          <Flex gap="small">
            <Badge dot={cookies.accessToken} status="success">
              <Popover placement="bottom" content={UserPopover}>
                <Avatar
                  size={25}
                  icon={<UserOutlined />}
                  className="header-avatar"
                />
              </Popover>
            </Badge>
            <Avatar
              size={25}
              icon={<HeartOutlined />}
              className="header-avatar"
            />
            <Badge
              count={cookies.accessToken && user?.cart && user.cart.length}
              offset={[3, -1]}
              size="small"
            >
              <Link to="/cart">
                <Avatar
                  size={25}
                  icon={<ShoppingCartOutlined />}
                  className="header-avatar"
                />
              </Link>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};
