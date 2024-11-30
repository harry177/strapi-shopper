import { useGetProductsQuery } from "../features/api/api";
import { Product } from "../components/Product";
import { IProduct } from "../components/types";

export const CatalogPage = () => {
  const { data: products } = useGetProductsQuery();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products?.data.map((product: IProduct) => (
        <Product
          key={product.slug}
          slug={product.slug}
          documentId={product.documentId}
          Title={product.Title}
          Image={product.Image}
          Price={product.Price}
        />
      ))}
    </div>
  );
};
