import { CartItemsType } from "../redux/slices/cartSlice";

export const calcTotalCount = (cartItems: CartItemsType[]) => {
    return cartItems.reduce((sum, item) => sum + item.count, 0);
}