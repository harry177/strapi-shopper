import { Button, Card, Flex, Image as AntImage, Typography, Badge } from "antd";
import { IProduct } from "../types";
import "./product.scss";
import { Link } from "react-router-dom";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../features/api/api";
import { useCookies } from "react-cookie";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/reduxHooks";

export const Product = ({ slug, Title, Image, Price }: IProduct) => {
  const [cookies] = useCookies(["accessToken", "userId", "userDocumentId"]);

  const cartItems = useAppSelector((state) => state.cart);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleAddToCart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart({
      id: slug as number,
      userId: cookies.userId,
      userDocumentId: cookies.userDocumentId,
      token: cookies.accessToken,
    });
  };

  const handleRemoveFromCart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    removeFromCart({
      id: slug as number,
      userId: cookies.userId,
      userDocumentId: cookies.userDocumentId,
      token: cookies.accessToken,
    });
  };

  return (
    <Link to={`/catalog/${slug}`}>
      <Card>
        <Flex vertical>
          <div className="catalog__card-image__container">
            <AntImage
              width={300}
              height={300}
              src={`http://localhost:1337${Image[0].url}`}
              alt={Image[0].alt}
              preview={false}
              className="catalog__card-image"
            />
          </div>
          <Typography.Paragraph>{Title}</Typography.Paragraph>
          <Flex
            align="center"
            justify="space-between"
            className="price-cart__container"
          >
            <Typography.Text>{`${Price} €`}</Typography.Text>
            <div>
              <Flex gap="small" align="center">
                <Button
                  className="catalog__card-button"
                  disabled={!cookies.accessToken}
                  onClick={(event) => {
                    handleRemoveFromCart(event);
                  }}
                >
                  -
                </Button>
                {cookies.accessToken ? (
                  <Badge
                    count={
                      cartItems.cart.filter(
                        (item) => item.product[0].slug === slug
                      ).length
                    }
                    offset={[2, -2]}
                    size="small"
                  >
                    <ShoppingCartOutlined style={{ fontSize: "150%" }} />
                  </Badge>
                ) : (
                  <ShoppingCartOutlined style={{ fontSize: "150%" }} />
                )}
                <Button
                  className="catalog__card-button"
                  disabled={!cookies.accessToken}
                  onClick={(event) => handleAddToCart(event)}
                >
                  +
                </Button>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
