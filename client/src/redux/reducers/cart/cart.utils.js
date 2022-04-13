//NOTEŒŒ
export const addUniqueItemsToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item._id.toString() === cartItemToAdd._id.toString()
  );
  if (existingCartItem) {
    const result = cartItems.map((cartItem) => {
      return cartItem._id === cartItemToAdd._id
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
        : cartItem;
    });
    return result;
  } else {
    return [...cartItems, { ...cartItemToAdd, cartQuantity: 1 }];
  }
};
