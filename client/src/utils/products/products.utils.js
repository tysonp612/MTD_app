import axios from "axios";

export const productsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const getAllProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};
export const createProducts = async (values, authToken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, values, {
    headers: { authToken },
  });
};
export const getSortedProducts = async (sortBy, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products`, {
    sortBy,
    order,
    page,
  });
};
export const getOneProduct = async (slug, authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authToken },
  });
};
export const updateProduct = async (slug, authToken, values) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    { values },
    {
      headers: { authToken },
    }
  );
};
export const deleteProduct = async (slug, authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: { authToken },
  });
};
