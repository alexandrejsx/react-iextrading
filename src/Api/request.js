import axios from "axios";
import { API_URL } from "./getUrl";

export default async function requestApi(functionName, parameters) {
	const URL = `${API_URL}/${functionName}`;
	const OPTIONS = {
		headers: {
			"Cache-Control": "no-cache",
			"Content-Type": "application/json",
		},
	};

	return axios.post(URL, parameters, OPTIONS);
}

/*export default async function requestApi(functionName, parameters) {
	const URL = `${API_URL}/${functionName}`;
	const OPTIONS = {
		method: "POST",
    credentials: 'same-origin',
		mode: "no-cors",
		headers: {
			"Cache-Control": "no-cache",
      'Accept': 'application/json',
			"Content-Type": "application/json",
		},
		body: JSON.stringify(parameters),
	};

	return fetch(URL, OPTIONS);
}
 */
