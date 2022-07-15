import { StorageKeys } from "../constants/StorageKeys";

export default class CartService {

    updateCartItems = (items) => {
        localStorage.setItem(StorageKeys.cart, JSON.stringify(items))

        return this.getCartItems();
    }

    getCartItems = () => {
        return JSON.parse(localStorage.getItem(StorageKeys.cart)) ?? [];
    }

    clearCart = () => {
        localStorage.removeItem(StorageKeys.cart);
    }
}