import { CartItemsType } from "../redux/slices/cartSlice";

export const calcTotalPrice = (cartItems: CartItemsType[]) => {
    return cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
}