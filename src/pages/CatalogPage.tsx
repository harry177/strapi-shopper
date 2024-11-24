import { useEffect } from "react";
import { useGetProductsQuery } from "../features/api/api";
import { Product } from "../components/Product";
import { IProduct } from "../components/types";

export const CatalogPage = () => {
  const { data: products, isSuccess } = useGetProductsQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(products);
    }
  }, [isSuccess]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products?.data.map((product: IProduct) => (
        <Product
          key={product.id}
          Title={product.Title}
          Image={product.Image}
          Price={product.Price}
        />
      ))}
    </div>
  );
};
