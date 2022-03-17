import axios from "axios";

export const createProducts = async (values, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, values, {
    headers: { authToken },
  });
};
