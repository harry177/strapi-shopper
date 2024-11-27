import { useGetProductsQuery } from "../features/api/api";
import { Product } from "../components/Product";
import { IProduct } from "../components/types";

export const CatalogPage = () => {
  const { data: products } = useGetProductsQuery();

  console.log(products)

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products?.data.map((product: IProduct) => (
        <Product
          key={product.id}
          id={product.id}
          documentId={product.documentId}
          Title={product.Title}
          Image={product.Image}
          Price={product.Price}
        />
      ))}
    </div>
  );
};
