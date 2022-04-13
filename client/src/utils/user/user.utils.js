import axios from "axios";

const updateCart = async (cart, userId) => {
  return await axios.put(`${process.env.REACT_APP_API}/user/addToCart`, {
    cart: cart,
    userId: userId,
  });
};
