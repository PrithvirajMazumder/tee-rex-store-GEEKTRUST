import { useState } from "react";
import CartService from "../../services/Cart.service";
import CartContext from "./Cart.context";

const CartStore = ({ children }) => {
  const { updateCartItems, getCartItems } = new CartService();
  const [cartItems, setCartItems] = useState(getCartItems());

  const addToCart = (product) => {
    const cartProducts = getCartItems();
    const productFromCart = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productFromCart) {
      const index = cartProducts.indexOf(productFromCart);
      cartProducts[index].cartQuantity += 1;
    } else if (!productFromCart) {
      product.cartQuantity = 1;
      cartProducts.push(product);
    }

    updateCartItems(cartProducts);
    setCartItems(getCartItems());
  };

  const reduceItemFromCart = (product) => {
    const cartProducts = getCartItems();
    const productFromCart = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    const index = cartProducts.indexOf(productFromCart);

    if (productFromCart.cartQuantity > 1) {
      cartProducts[index].cartQuantity -= 1;
    } else if (productFromCart.cartQuantity <= 1) {
      cartProducts.splice(index, 1);
    }

    updateCartItems(cartProducts);
    setCartItems(getCartItems());
  };

  const removeFromCart = (product) => {
    const cartProducts = getCartItems();
    const productFromCart = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    const index = cartProducts.indexOf(productFromCart);
    cartProducts.splice(index, 1);
    updateCartItems(cartProducts);
    setCartItems(getCartItems());
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, reduceItemFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartStore;
