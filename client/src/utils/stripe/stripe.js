import axios from "axios";
export const createPaymentIntent = async (authToken) => {
	console.log(authToken);
	return await axios.post(
		`${process.env.REACT_APP_API}/create-payment-intent`,
		{},
		{
			headers: { authToken },
		}
	);
};
