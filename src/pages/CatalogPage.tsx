import { Flex } from "antd";
import { useGetProductsQuery } from "../features/api/api";
import { Product } from "../components/Product/Product";
import { IProduct } from "../components/types";
import { CatalogSkeleton } from "../components/CatalogSkeleton/CatalogSkeleton";

export const CatalogPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <Flex justify="flex-start" align="flex-start"  gap="middle" wrap style={{width: "100%"}}>
      {isLoading
        ? Array.from([1, 2, 3]).map((item, index) => (
            <CatalogSkeleton key={index} />
          ))
        : products?.data.map((product: IProduct) => (
            <Product
              key={product.slug}
              slug={product.slug}
              documentId={product.documentId}
              Title={product.Title}
              Image={product.Image}
              Price={product.Price}
            />
          ))}
          {/*Array.from([1, 2, 3]).map((item, index) => (
            <CatalogSkeleton key={index} />
          ))*/}
    </Flex>
  );
};
