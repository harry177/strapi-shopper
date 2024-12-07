import { useAppSelector } from "../hooks/reduxHooks";
import { CartProduct } from "../components/CartProduct/CartProduct";

export const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart);

  const resultedArray = () => {
    const res = new Map();
  
    for (const item of cartItems.cart) {
      const productKey = item.product[0]?.slug; 
      console.log(productKey);
  
      if (!res.has(productKey)) {
        res.set(productKey, { product: item.product[0], amount: 1 });
      } else {
        const existingEntry = res.get(productKey);
        existingEntry.amount++;
        res.set(productKey, existingEntry);
      }
    }
    return Array.from(res.values());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {resultedArray().map((cartItem) => (
        <CartProduct
        key={cartItem.product.slug}
        slug={cartItem.product.slug}
        documentId={cartItem.product.documentId}
        Title={cartItem.product.Title}
        Image={cartItem.product.Image}
        Price={cartItem.product.Price}
      />
      ))}
    </div>
  );
};
