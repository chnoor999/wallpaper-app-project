import axios from "axios";

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/`;

export const getImages = async () => {
  const response = await axios.get(API_URL +"?key="+ API_KEY);

  return response.data
};
