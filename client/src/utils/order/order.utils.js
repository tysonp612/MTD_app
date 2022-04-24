import axios from "axios";

export const createOrder = async (paymentIntent, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order/createOrder`,
    { paymentIntent },
    {
      headers: { authToken },
    }
  );
};
