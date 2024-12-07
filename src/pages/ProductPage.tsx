import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/api";
import { Flex, Image as AntImage, Typography } from "antd";

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id!);

  return (
    <>
      {product && (
        <Flex gap="large">
          <AntImage
            width={400}
            height={400}
            src={`http://localhost:1337${product.data.Image[0].url}`}
            alt={product.data.Image[0].alt}
          />
          <Flex vertical>
            <Typography.Title>{product.data.Title}</Typography.Title>
            <Typography.Paragraph>
              Price: {product.data.Price}
            </Typography.Paragraph>
          </Flex>
        </Flex>
      )}
    </>
  );
};
