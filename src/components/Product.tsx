import { Button, Card, Flex, Image as AntImage, Typography } from "antd";
import { IProduct } from "./types";
import "./product.scss";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../features/api/api";
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
            onClick={() =>
              addToCart({
                id: slug as number,
                userId: cookies.userId,
                userDocumentId: cookies.userDocumentId,
                token: cookies.accessToken,
              })
            }
          >
            Add to cart
          </Button>
        </Flex>
      </Card>
    </Link>
  );
};
