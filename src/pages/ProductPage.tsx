import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/api";

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id!);

  return (
    <>
      {product && (
        <div>
          <h1>{product.data.Title}</h1>
          <p>Цена: {product.data.Price}</p>
        </div>
      )}
    </>
  );
};
