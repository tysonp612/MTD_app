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

export const getCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/getCart`, {
    headers: { authToken },
  });
};
