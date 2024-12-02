import { Button, Card, Flex, Image as AntImage, Typography } from "antd";
import { IProduct } from "./types";
import "./product.scss";
import { Link } from "react-router-dom";
import { useAddToCartMutation, useRemoveFromCartMutation } from "../features/api/api";
import { useCookies } from "react-cookie";

export const Product = ({
  slug,
  documentId,
  Title,
  Image,
  Price,
}: IProduct) => {
  const [cookies] = useCookies(["accessToken", "userId", "userDocumentId"]);

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
  }

  return (
    <Link to={`/product/${documentId}`}>
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
          <Typography.Paragraph>{`${Price} €`}</Typography.Paragraph>
          <Button
            color="default"
            variant="solid"
            className="catalog__card-button"
            onClick={(event) => handleAddToCart(event)}
          >
            Add to cart
          </Button>
          <Button
            color="default"
            variant="solid"
            className="catalog__card-button"
            onClick={(event) => {handleRemoveFromCart(event)}}
          >
            Remove from cart
          </Button>
        </Flex>
      </Card>
    </Link>
  );
};
