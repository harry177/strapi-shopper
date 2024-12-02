import { useAppSelector } from "../hooks/reduxHooks";
import { IReturnedCartItem } from "../features/types";

export const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {cartItems.cart.map((cartItem: IReturnedCartItem, index: number) => (
        <p key={index}>{cartItem.product[0].Title}</p>
      ))}
    </div>
  );
};
