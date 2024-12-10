import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/api";
import { Flex, Image as AntImage, Typography } from "antd";
import { API_URL } from "../features/api/instance";

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
            src={API_URL.slice(0, -4) + product.data.Image[0].url}
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
