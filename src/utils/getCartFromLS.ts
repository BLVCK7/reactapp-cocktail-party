import { calcTotalCount } from './calcTotalCount';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const cartItems = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(cartItems)
    const totalCount = calcTotalCount(cartItems)

        return {
            cartItems,
            totalPrice,
            totalCount,
        }
}