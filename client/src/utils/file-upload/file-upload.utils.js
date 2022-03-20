import axios from "axios";

export const uploadFiles = async (uri, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/uploadimages`,
    { images: uri },
    { headers: { authToken } }
  );
};
