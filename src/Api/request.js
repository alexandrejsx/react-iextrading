import axios from "axios";
import { API_URL } from "./getUrl";

export default async function requestApi(functionName, parameters) {
	const URL = `${API_URL}/${functionName}`;
	const OPTIONS = {
		method: "HEAD",
		mode: "no-cors",
		headers: {
			"Cache-Control": "no-cache",
			"Content-Type": "application/json",
		},
	};

	return axios.post(URL, parameters, OPTIONS);
}
