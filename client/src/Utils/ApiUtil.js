import axios from "axios";

const ApiUtil = async (
	method,
	url,
	data = {},
	config = {
		headers: {
			"Content-Type": "application/json",
		},
	}
) => {
	try {
		const response = await axios({
			method: method,
			url: url,
			data: data,
			config: config,
		});
		return response.data;
	} catch (err) {
		alert(err);
		return err;
	}
};

export default ApiUtil;
