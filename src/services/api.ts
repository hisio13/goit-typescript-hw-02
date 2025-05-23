import axios from "axios";
import { GetDataImg } from "./api.types";

const KeyAxios = "BpYRJE4xvIB7Hxr42pvsR_NQNvTzNNmnT9DRQT8iIoo";

export const fetchData = async (
  query: string,
  page: number,
  signal: AbortSignal
): Promise<GetDataImg> => {
  const response = await axios.get<GetDataImg>(
    `https://api.unsplash.com/search/photos/?client_id=${KeyAxios}&per_page=5&query=${query}&page=${page}`,
    { signal }
  );
  console.log(response.data);
  return response.data;
};