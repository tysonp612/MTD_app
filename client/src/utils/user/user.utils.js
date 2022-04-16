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
export const emptyCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/emptyCart`, {
    headers: { authToken },
  });
};

export const updateAddress = async (authToken, address) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/updateAddress`,
    { address },
    {
      headers: { authToken },
    }
  );
};
