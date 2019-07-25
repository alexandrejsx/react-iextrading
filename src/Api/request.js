import axios from "axios";
import { API_URL } from "./getUrl";

export default async function requestApi(functionName, parameters) {
  const URL = `${API_URL}/${functionName}`;
  const HEADER = {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json"
    }
  };

  return axios.post(URL, parameters, HEADER);
}
