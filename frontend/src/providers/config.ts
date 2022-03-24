import axios from "axios";

export const API_HOST = process.env.REACT_APP_API_HOST;

export const restAPI = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
});
