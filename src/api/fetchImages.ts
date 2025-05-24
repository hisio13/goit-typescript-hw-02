import axios from "axios";
import type { ApiResponseData } from "./api.types";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] =
  "Client-ID BpYRJE4xvIB7Hxr42pvsR_NQNvTzNNmnT9DRQT8iIoo";

const fetchImages = async (query: string, page: number): Promise<ApiResponseData> => {
  const params = {
    page,
    query,
    orientation: "squarish",
    per_page: 12,
  };

  const res = await axios.get<ApiResponseData>("/search/photos", { params });
  return res.data;
};

export default fetchImages;
