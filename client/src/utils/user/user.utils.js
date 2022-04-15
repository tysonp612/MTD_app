import axios from "axios";

export const updateCart = async (cart, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/addToCart`,
    {
      cart: cart,
    },
    { headers: { authToken } }
  );
};
