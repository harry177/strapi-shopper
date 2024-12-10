import { Card, Flex, Image as AntImage, Typography, Button } from "antd";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IProduct } from "../types";
import { useCookies } from "react-cookie";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../features/api/api";
import { API_URL } from "../../features/api/instance";

export const CartProduct = ({ slug, Title, Image, Price }: IProduct) => {
  const [cookies] = useCookies(["accessToken", "userId", "userDocumentId"]);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const cartItems = useAppSelector((state) => state.cart);

  const cartProductAmount = cartItems.cart.filter(
    (item) => item.product[0].slug === slug
  ).length;

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
    <Card>
      <Flex align="center" justify="space-between">
        <Flex>
          <AntImage
            width={200}
            height={200}
            src={API_URL.slice(0, -4) + Image[0].url}
            alt={Image[0].alt}
            preview={false}
            className="catalog__card-image"
          />
        </Flex>
        <Flex vertical>
          <Typography.Paragraph>{Title}</Typography.Paragraph>
          <Typography.Text>{`${Price} €`}</Typography.Text>
        </Flex>
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
          {cartProductAmount}
          <Button
            className="catalog__card-button"
            disabled={!cookies.accessToken}
            onClick={(event) => handleAddToCart(event)}
          >
            +
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
