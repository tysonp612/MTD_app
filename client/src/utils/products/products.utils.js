import axios from "axios";

export const getAllProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};
export const createProducts = async (values, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, values, {
    headers: { authToken },
  });
};
