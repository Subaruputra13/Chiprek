import axios from "axios";
import { BASE_URL } from "../utils/utils";

export const baseAPI = axios.create({
  baseURL: BASE_URL.API,
  headers: {
    "Content-Type": "application/json",
  },
});
