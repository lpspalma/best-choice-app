import axios from "axios";
import { AppError } from "../errors/AppError";

const baseURL = process.env.FOOTBALL_DATA_BASE_URL;
const apiKey = process.env.FOOTBALL_DATA_API_KEY;

if (!baseURL) {
  throw new AppError("FOOTBALL_DATA_BASE_URL is missing", 500);
}

if (!apiKey) {
  throw new AppError("FOOTBALL_DATA_API_KEY is missing", 500);
}

export const footballDataApi = axios.create({
  baseURL,
  headers: {
    "X-Auth-Token": apiKey,
  },
});
