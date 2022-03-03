import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  //the empty {} is the body that we need to send to BE, the second {} is for header
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    { headers: { authToken: authToken } }
  );
};
