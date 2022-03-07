import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getOneCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`);
};

//send token in header
export const removeCategory = async (slug, authtoken) => {
  return (
    await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`),
    { headers: { authtoken } }
  );
};

export const updateCategory = async (slug, authtoken, updateCategory) => {
  return (
    await axios.put(`${process.env.REACT_APP_API}/categories/${slug}`),
    updateCategory,
    { headers: { authtoken } }
  );
};

export const createCategory = async (slug, authtoken, createCategory) => {
  return (
    await axios.create(`${process.env.REACT_APP_API}/categories/${slug}`),
    createCategory,
    { headers: { authtoken } }
  );
};
